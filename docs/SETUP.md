# Setup & deployment
1. `cp .env.example .env.local`, fill values. Never commit it.
2. Supabase: create a project → Auth: enable Email (confirm email ON), set Site URL = NEXT_PUBLIC_SITE_URL, add `<site>/auth/callback` to Redirect URLs. Optional Phone provider for mobile OTP.
3. Database: `supabase db push` (or paste `supabase/migrations/0001_core.sql` in the SQL editor).
4. Create the first admin manually in SQL (never via the app): `insert into user_roles values ('<user-uuid>','admin');`
5. Insert real plans into `subscription_plans` (set `active = true`) and categories into `service_categories`.
6. `npm install && npm run typecheck && npm test && npm run build && npm start`
7. Deploy (e.g. Vercel): set env vars, attach domain, HTTPS is automatic. Webhook URL: `<site>/api/webhooks/payments` — adapt signature/payload parsing to the gateway.
8. Search Console: verify domain, submit `<site>/sitemap.xml`. Add GA4 only after cookie-consent is implemented.
9. Rate limiting is in-memory; use Redis/Upstash before running more than one instance.
