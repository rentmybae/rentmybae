# RentMyBae 💜
**Your Perfect Plus One.**

RentMyBae is an adults-only (18+) marketplace for booking verified companions by the hour for social plans — coffee, movies, events, shopping and city tours. Launching in **Delhi, Gurugram, Noida and Ghaziabad**. Companionship only: a booking never implies consent to anything else.

## Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, RLS) · Zod · Vitest

## What works today
- Home page, services, how it works, pricing, city landing pages (`/companions/delhi` …), FAQ, About, Contact, Help
- **Login / Register** (email or mobile number + password), email verification, forgot/reset password, logout, rate limiting
- Protected dashboard, bookings, transactions, settings (account-deletion request), admin overview (server-side roles)
- Membership page with server-side pricing and GST breakdown
- 10 legal pages incl. a detailed **Privacy Policy** (DPDP Act 2023) and **Terms & Conditions**
- SEO: per-page titles/descriptions, canonical URLs, Open Graph image, `robots.txt`, `sitemap.xml`, JSON-LD (Organization, WebSite, BreadcrumbList), custom 404
- Official logo, favicon and app icons in `public/brand/` and `src/app/`

See `docs/STATUS.md` for what is **not** built yet (payment gateway, ID-verification provider, booking engine UI, payouts).

## Run locally
```bash
npm install
cp .env.example .env.local      # fill in Supabase keys (see docs/AUTH_AND_LEGAL.md)
npm run dev                     # http://localhost:3000
```
Checks: `npm run typecheck && npm test && npm run check:routes && npm run build`

## Deploy
Vercel (recommended, free tier works). Step-by-step guide: **`docs/DEPLOYMENT.md`**.
GitHub Pages can't run this app (it needs a server for login and payments).

## Project structure
```
src/app/            pages and routes (App Router)
src/components/     UI (Header, Footer, auth forms, legal page renderer …)
src/lib/            config, validation, services, cities, legal text (src/lib/legal/)
supabase/migrations SQL: run 0001, 0002, 0003 in order
public/brand/       logo, symbol, lockup, favicon, app icons, OG image
docs/               setup, deployment, status, SEO notes
tests/              Vitest unit tests
```

## Responsible use
Lawful, consensual adult companionship and social activities only. All users must be 18+ and follow the Community Guidelines.

## License
No open-source license has been selected. All rights reserved.
