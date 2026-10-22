# RentMyBae — build status (honest)

## Verified in this environment (no network, so no npm install)
- `npm run check:routes` — every header/footer/account-menu/sitemap link maps to a real page; no private route in sitemap. PASS
- Pure-logic checks (money/GST/booking maths, age, HMAC webhook signature, rate limiter, phone normalisation). PASS (11)

## NOT yet run (needs `npm install`): typecheck, lint, `next build`, vitest, Playwright
Run locally: `npm install && npm run typecheck && npm run lint && npm test && npm run build`. Expect to fix a few type errors — the code was written without a compiler.

## Implemented
Header/footer/mobile nav/account dropdown (role-aware) · /login /signup /forgot-password /reset-password (Supabase Auth, Zod, rate limiting, generic errors, open-redirect guard) · middleware route protection (fails closed) · 10 legal/policy pages (drafts with highlighted [to confirm] items) · /about /contact /help /faq · /membership with server-side plan lookup + GST breakdown · checkout action (refuses cleanly while gateway unconfigured) · payment webhook skeleton (raw-body HMAC, idempotent, amount-checked SQL function) · dashboard, bookings, transactions, settings (+deletion request), admin overview (server RBAC) · robots.ts, sitemap.ts, 404, JSON-LD · SQL migration 0001 (RLS, age-checking signup trigger, overlap-proof bookings).

## Phase 2.1 (see docs/AUTH_AND_LEGAL.md)
Redesigned login/signup (mobile or email login, password checklist, intent cards), working mobile login via migration 0002, consent records, detailed Privacy Policy and Terms. Verified: typecheck, 25 vitest tests, next build (Google font stubbed only in the sandbox).

## NOT implemented
- Mobile OTP verification (needs SMS provider) — signup verifies email only
- Identity/age verification provider, private document storage, media upload + moderation
- Payment gateway adapter (order creation, refunds, chargebacks) — provider not chosen
- Booking creation UI/server action, availability calendar, extensions, timers, reviews, saved profiles
- Companion search/directory, city landing pages (only to be built when real availability exists)
- Ledger, payout requests, refunds, support tickets, safety-report forms, notifications
- Admin: verification queue, moderation, refunds/payouts, pricing + legal CMS (only an overview exists)
- Playwright e2e, Search Console / GA4 wiring, Remember-me (omitted deliberately; Supabase sessions persist by default)
- Job to expire unpaid `pending_payment` bookings

## Before launch
Qualified Indian legal review of all policies (every [highlighted] item) · independent security review · payment-provider merchant approval · real business/contact/grievance details in env.
