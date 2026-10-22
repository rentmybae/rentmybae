# Login, signup and legal pages (Phase 2.1)

## Why login/signup "did nothing"
The pages existed, but every submit returned "authentication service is not configured" because
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` were empty. The pages now say so up front
(developer note in dev, a neutral message in production). Also fixed:
- A build made without Supabase env vars froze every page as "logged out" (static render). `getSession()` now forces per-request rendering.
- Mobile-number login could never succeed (Supabase password login is email-based; the phone was only stored in profile metadata). Login now resolves mobile -> email server-side through `email_for_mobile()` (service role only).
- "Prefer not to say" gender failed validation.
- Forms lost everything the user typed after a server error. Non-secret values are now echoed back.

## To make it work
1. Supabase project -> Settings -> API: copy URL, anon key and service_role key into `.env.local` (or Vercel env):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only, needed for mobile login).
2. Auth -> Providers -> Email: enabled, "Confirm email" ON. Auth -> URL configuration: Site URL = `NEXT_PUBLIC_SITE_URL`, Redirect URLs include `<site>/auth/callback`.
3. Run migrations in order: `0001_core.sql`, then `0002_auth_mobile_login.sql`.
4. Restart `npm run dev` (env vars are read at start-up).

## Legal pages
- Privacy Policy: `src/lib/legal/privacy.ts` (18 sections, DPDP Act 2023 + DPDP Rules 2025 + IT Act).
- Terms & Conditions: `src/lib/legal/terms.ts` (27 sections, incl. consent/companionship-only rule, membership, bookings, payouts, IT Rules 2021, Consumer Protection Act 2019, arbitration).
- Text in `[[...]]` renders highlighted. Business details fill in automatically from the `NEXT_PUBLIC_LEGAL_*` env vars.
  These must be edited directly in the files: payment gateway name, identity-verification provider, hosting provider/region,
  email & SMS providers, analytics provider, platform fee/commission, payout schedule.
- Bump `LEGAL_VERSION` in `src/lib/legal/common.ts` whenever the policies change materially; it is stored with each user's consent.

## Business choices written into the policies (confirm or change)
Lifetime plan pro-rata refund if the programme ends within 3 years · 48-hour dispute window before payouts ·
liability cap = higher of 6 months' fees or Rs 5,000 · arbitration seated in New Delhi · retention periods in Privacy §10 ·
7 days' notice for material Terms changes · grievance acknowledgement 24 h / resolution 15 days.
Have an Indian lawyer review both documents before launch.
