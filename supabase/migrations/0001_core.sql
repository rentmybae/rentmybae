-- RentMyBae core schema. Run with the Supabase CLI (supabase db push) or the SQL editor.
create extension if not exists btree_gist;
create extension if not exists pgcrypto;

create type app_role as enum ('customer','companion','moderator','support','admin');

-- ---------- reference data
create table supported_cities (slug text primary key, name text not null, active boolean not null default true);
insert into supported_cities values ('delhi','Delhi',true),('gurugram','Gurugram',true),('noida','Noida',true),('ghaziabad','Ghaziabad',true);

create table service_categories (slug text primary key, name text not null, active boolean not null default false, requires_review boolean not null default false);

create table subscription_plans (
  id uuid primary key default gen_random_uuid(),
  code text unique not null, name text not null,
  duration_months int check (duration_months is null or duration_months > 0),   -- null = lifetime
  price_paise int not null check (price_paise > 0), gst_bps int not null default 1800 check (gst_bps >= 0),
  features jsonb not null default '[]', renewal_terms text, active boolean not null default false, sort int not null default 0
);

-- ---------- users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null, mobile_e164 text, city text references supported_cities(slug), pin_code text,
  date_of_birth date not null, gender text, account_intent text not null check (account_intent in ('customer','companion','both')),
  age_verified boolean not null default false,        -- only set by service role after identity verification
  created_at timestamptz not null default now()
);
create table user_roles (user_id uuid references auth.users(id) on delete cascade, role app_role not null, granted_at timestamptz not null default now(), primary key (user_id, role));

create or replace function has_role(uid uuid, r app_role) returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from user_roles where user_id = uid and role = r) $$;

-- Re-validates age server-side so a direct API signup cannot bypass the form. Never grants staff roles.
create or replace function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
declare m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb); dob date; intent text;
begin
  begin dob := (m->>'dob')::date; exception when others then dob := null; end;
  if dob is null or dob > (current_date - interval '18 years')::date then raise exception 'age_requirement_not_met'; end if;
  intent := coalesce(m->>'account_intent','customer');
  if intent not in ('customer','companion','both') then intent := 'customer'; end if;
  insert into profiles (id, full_name, mobile_e164, city, pin_code, date_of_birth, gender, account_intent)
  values (new.id, coalesce(nullif(m->>'full_name',''),'Unnamed'), m->>'mobile_e164',
          (select slug from supported_cities where slug = m->>'city'), m->>'pin_code', dob, nullif(m->>'gender',''), intent);
  if intent in ('customer','both') then insert into user_roles values (new.id,'customer'); end if;
  if intent in ('companion','both') then insert into user_roles values (new.id,'companion'); end if;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- ---------- payments & subscriptions
create table payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  purpose text not null check (purpose in ('membership','booking','extension')),
  plan_id uuid references subscription_plans(id), booking_id uuid,
  base_paise int not null check (base_paise > 0), gst_paise int not null default 0, amount_paise int not null check (amount_paise > 0),
  currency text not null default 'INR', status text not null default 'pending' check (status in ('pending','paid','failed','refunded','disputed')),
  provider text, provider_order_id text, idempotency_key text unique,
  created_at timestamptz not null default now(), paid_at timestamptz,
  check (amount_paise = base_paise + gst_paise)
);
create table webhook_events (provider text not null, event_id text not null, payload jsonb not null, received_at timestamptz not null default now(), primary key (provider, event_id));
create table subscriptions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id), plan_id uuid not null references subscription_plans(id),
  status text not null default 'active' check (status in ('active','expired','cancelled')), starts_at timestamptz not null default now(), ends_at timestamptz,
  payment_txn_id uuid unique references payment_transactions(id)
);
create unique index one_active_subscription on subscriptions(user_id) where status = 'active';

-- Called ONLY by the verified webhook (service role). Idempotent; checks amount; never touches profile approval.
create or replace function apply_payment_success(p_txn uuid, p_amount_paise int) returns text language plpgsql security definer set search_path = public as $$
declare t payment_transactions; pl subscription_plans;
begin
  select * into t from payment_transactions where id = p_txn for update;
  if not found then return 'not_found'; end if;
  if t.status = 'paid' then return 'already_paid'; end if;
  if p_amount_paise is distinct from t.amount_paise then
    insert into audit_logs(action, entity, entity_id, meta) values ('payment_amount_mismatch','payment_transactions', t.id::text, jsonb_build_object('expected', t.amount_paise, 'got', p_amount_paise));
    return 'amount_mismatch';
  end if;
  update payment_transactions set status = 'paid', paid_at = now() where id = t.id;
  if t.purpose = 'membership' then
    select * into pl from subscription_plans where id = t.plan_id;
    insert into subscriptions (user_id, plan_id, ends_at, payment_txn_id)
    values (t.user_id, t.plan_id, case when pl.duration_months is null then null else now() + make_interval(months => pl.duration_months) end, t.id);
  end if;
  return 'ok';
end $$;
revoke all on function apply_payment_success(uuid,int) from public, anon, authenticated;
grant execute on function apply_payment_success(uuid,int) to service_role;

-- ---------- bookings (overlap prevention enforced by the database)
create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id), companion_id uuid not null references auth.users(id),
  service_slug text not null references service_categories(slug),
  start_at timestamptz not null, end_at timestamptz not null, duration_minutes int not null check (duration_minutes in (60,120,180,240,360,480)),
  hourly_rate_paise int not null check (hourly_rate_paise > 0), subtotal_paise int not null, platform_fee_paise int not null default 0, gst_paise int not null default 0,
  total_paise int not null, commission_paise int not null default 0,
  status text not null default 'pending_payment' check (status in ('pending_payment','awaiting_confirmation','confirmed','in_progress','completed','cancelled','refund_pending','refunded','disputed','no_show')),
  payment_txn_id uuid references payment_transactions(id), created_at timestamptz not null default now(),
  check (end_at > start_at), check (customer_id <> companion_id),
  constraint no_companion_overlap exclude using gist (companion_id with =, tstzrange(start_at, end_at, '[)') with &&)
    where (status in ('pending_payment','awaiting_confirmation','confirmed','in_progress')),
  constraint no_customer_overlap exclude using gist (customer_id with =, tstzrange(start_at, end_at, '[)') with &&)
    where (status in ('pending_payment','awaiting_confirmation','confirmed','in_progress'))
);
-- NOTE: unpaid 'pending_payment' rows hold the slot; a scheduled job must expire them (see docs/STATUS.md).

-- ---------- misc
create table audit_logs (id bigserial primary key, actor_id uuid, action text not null, entity text, entity_id text, meta jsonb, created_at timestamptz not null default now());
create table account_deletion_requests (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id), reason text, status text not null default 'pending' check (status in ('pending','processing','completed','rejected')), requested_at timestamptz not null default now());
create unique index one_pending_deletion on account_deletion_requests(user_id) where status = 'pending';

-- ---------- row-level security
alter table supported_cities enable row level security; alter table service_categories enable row level security; alter table subscription_plans enable row level security;
alter table profiles enable row level security; alter table user_roles enable row level security;
alter table payment_transactions enable row level security; alter table webhook_events enable row level security; alter table subscriptions enable row level security;
alter table bookings enable row level security; alter table audit_logs enable row level security; alter table account_deletion_requests enable row level security;

create policy cities_read on supported_cities for select using (true);
create policy categories_read on service_categories for select using (active);
create policy plans_read on subscription_plans for select using (active);
create policy plans_admin on subscription_plans for all using (has_role(auth.uid(),'admin')) with check (has_role(auth.uid(),'admin'));

create policy profiles_own_read on profiles for select using (id = auth.uid());
create policy profiles_own_update on profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_admin_read on profiles for select using (has_role(auth.uid(),'admin'));
revoke update on profiles from anon, authenticated;
grant update (full_name, city, pin_code) on profiles to authenticated;      -- age_verified / DOB / intent cannot be self-edited

create policy roles_own_read on user_roles for select using (user_id = auth.uid());   -- no insert/update policy: roles are never client-writable

create policy txn_own_read on payment_transactions for select using (user_id = auth.uid());
create policy txn_admin_read on payment_transactions for select using (has_role(auth.uid(),'admin'));
create policy subs_own_read on subscriptions for select using (user_id = auth.uid());
create policy bookings_party_read on bookings for select using (customer_id = auth.uid() or companion_id = auth.uid());
create policy bookings_admin_read on bookings for select using (has_role(auth.uid(),'admin'));
create policy audit_admin_read on audit_logs for select using (has_role(auth.uid(),'admin'));
create policy deletion_own_insert on account_deletion_requests for insert with check (user_id = auth.uid());
create policy deletion_own_read on account_deletion_requests for select using (user_id = auth.uid());
create policy deletion_admin_read on account_deletion_requests for select using (has_role(auth.uid(),'admin'));
-- webhook_events and all writes to payments/bookings/subscriptions/audit_logs: service role only (no policies).
