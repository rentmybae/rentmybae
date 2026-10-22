-- 0002: mobile-number login + consent columns
-- Supabase password auth is keyed on email. To let users log in with their mobile number,
-- the server resolves mobile -> email with the service role. This function is NOT callable
-- by anon/authenticated users, so it cannot be used to enumerate accounts from the browser.

-- One account per mobile number.
create unique index if not exists profiles_mobile_e164_key on profiles (mobile_e164) where mobile_e164 is not null;

create or replace function email_for_mobile(p_mobile text) returns text
language sql stable security definer set search_path = public, auth as $$
  select u.email from auth.users u join public.profiles p on p.id = u.id
  where p.mobile_e164 = p_mobile and u.deleted_at is null
  limit 1
$$;
revoke all on function email_for_mobile(text) from public, anon, authenticated;
grant execute on function email_for_mobile(text) to service_role;

-- Consent record (DPDP Act 2023 s.6): keep what was accepted, which version, and when.
alter table profiles add column if not exists terms_version text;
alter table profiles add column if not exists terms_accepted_at timestamptz;
alter table profiles add column if not exists marketing_opt_in boolean not null default false;
alter table profiles add column if not exists marketing_opt_in_at timestamptz;

create or replace function sync_consent_from_metadata() returns trigger
language plpgsql security definer set search_path = public as $$
declare m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  update profiles set
    terms_version       = m->>'terms_version',
    terms_accepted_at   = nullif(m->>'terms_accepted_at','')::timestamptz,
    marketing_opt_in    = coalesce((m->>'marketing_opt_in')::boolean, false),
    marketing_opt_in_at = nullif(m->>'marketing_opt_in_at','')::timestamptz
  where id = new.id;
  return new;
end $$;

-- Runs after 0001's on_auth_user_created (trigger names fire alphabetically: "on_auth_user_created" < "on_auth_user_created_consent").
drop trigger if exists on_auth_user_created_consent on auth.users;
create trigger on_auth_user_created_consent after insert on auth.users for each row execute function sync_consent_from_metadata();
