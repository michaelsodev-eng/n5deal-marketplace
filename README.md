# N5Deal Marketplace

A B2B marketplace prototype for buying and selling businesses and investment assets. The product is a working full-stack app: published listings, buyer and seller directories, role-based cabinets, and contact requests persisted in PostgreSQL.

The UI is Ukrainian. The navigation label **Marketplace** is kept in English.

This repository was prepared as a test-assignment delivery. It is a scoped prototype, not a production-ready multi-tenant platform.

## Overview

Sellers publish businesses and assets. Buyers browse listings, filter by financial and geographic criteria, and send contact requests. Sellers can browse buyer profiles and contact buyers. A platform manager can review users, assets, and contact activity, search and filter participants and listings, suspend or restore accounts and listings, and remove users that should not remain on the platform.

Registration creates a **BUYER** or **SELLER** account with a company profile. Manager accounts are not self-serve; they come from seed data.

## Main features

- Public home page with search and featured published assets
- Asset marketplace at `/assets` with URL-backed search, filters, sort, and pagination (published listings only)
- Asset detail pages at `/assets/[id]`
- Buyer directory at `/buyers` and `/buyers/[id]` (active buyers only)
- Seller directory at `/sellers` and `/sellers/[id]`, including each seller’s published assets
- Static Resources hub at `/resources` with client-side search and category filters (no article pages)
- Email/password login and registration (buyer or seller)
- Buyer cabinet: recommended assets, profile editing, sent and incoming contact requests
- Seller cabinet: create/edit own assets (draft or published), incoming and sent contact requests
- Manager cabinet: search/filter users and assets, activate/suspend/delete users, publish/suspend assets, read-only contact list
- Contact requests:
  - buyer → seller from a published asset
  - seller → buyer from a buyer profile
  - accept / reject by the recipient
  - duplicate pending requests are blocked
  - users cannot contact themselves

Not implemented, even where the UI hints at it:

- Saved/favorited assets (the buyer cabinet counter stays at `0`)
- Individual resource article pages (`Читати далі` does not open a detail route)
- Seller company-profile editing
- Email verification, password reset, or file uploads

## Tech stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16.3.1 App Router, React 19, TypeScript |
| UI | Tailwind CSS 4, Inter via `next/font` |
| Data | Prisma 7, PostgreSQL (`pg` + `@prisma/adapter-pg`) |
| Auth | Session cookie, `bcryptjs` password hashes |
| Seed | `tsx prisma/seed.ts` |

No additional runtime packages were added beyond the project’s original stack.

## Architecture

```
src/app/            routes, server actions, auth API
src/components/     UI: marketplace, dashboards, auth, resources
src/lib/            data access, auth helpers, URL/filter parsers
src/generated/      Prisma client (generated, gitignored)
prisma/             schema, migrations, seed
```

- **Server Components** load marketplace and dashboard data.
- **Client Components** handle filters, forms, and local UI state.
- **Server Actions** mutate assets, profiles, registration, and contacts.
- Prisma runs only on the server. Client modules do not import `src/lib/prisma.ts`.
- Marketplace list state lives in the URL (`search`, filters, `page`).
- Authorization is enforced on the server with `getCurrentUser()`. Client role is not trusted.

## Authentication and roles

Sessions are stored in PostgreSQL (`Session`) and sent as an httpOnly `session_token` cookie (7 days). `getCurrentUser()` loads the session, rejects expired tokens, and ignores **SUSPENDED** users.

| Role | Access |
| --- | --- |
| `BUYER` | `/dashboard`, buyer profile, send asset contact requests, respond to seller-to-buyer requests |
| `SELLER` | `/dashboard`, own asset CRUD, send buyer contact requests, respond to incoming asset requests |
| `MANAGER` | `/manager` only: search/filter users and assets, activate/suspend/delete users, publish/suspend assets |

Login: `POST /api/auth/login`. Logout: `POST /api/auth/logout`. Current user: `GET /api/auth/me`. Registration is a server action, not an auth API route. Suspended users cannot obtain a session.

## Database / Prisma

Prisma 7 uses `prisma.config.ts` (schema path, migrations, seed, `DATABASE_URL`). The client is generated to `src/generated/prisma`.

Models: `User`, `BuyerProfile`, `SellerProfile`, `Asset`, `ContactRequest`, `Session`.

Enums:

- `UserRole`: `BUYER`, `SELLER`, `MANAGER`
- `UserStatus`: `ACTIVE`, `SUSPENDED`
- `AssetStatus`: `DRAFT`, `PUBLISHED`, `SUSPENDED`
- `ContactStatus`: `PENDING`, `ACCEPTED`, `DECLINED`

`ContactRequest.assetId` is optional. Buyer-to-seller requests attach a published asset. Seller-to-buyer requests leave `assetId` empty and use `senderId` / `recipientId`.

## Local development

Requires Node.js, npm, and a PostgreSQL database.

```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to a PostgreSQL connection string. Then:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts from `package.json`:

```bash
npm run build
npm start
npm run lint
npx tsc --noEmit
```

`npx prisma db seed` runs `tsx prisma/seed.ts`, as configured in `prisma.config.ts`. Seed wipes users, profiles, assets, and contact requests, then inserts demo data.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string for the app, Prisma, and seed |

Copy `.env.example` and fill in the value locally. Do not commit `.env`. `NODE_ENV` is set by Next.js and is used only for cookie `secure` and the Prisma client singleton.

## Deployment

The Prisma client is generated at build time because `src/generated/prisma` is gitignored. This repo includes `vercel.json` so Vercel runs `npx prisma generate && next build`.

To publish:

1. Create a PostgreSQL database (Neon works) and set `DATABASE_URL` in the host’s environment, for both build and runtime.
2. Deploy to [Vercel](https://vercel.com/new) from this GitHub repository, or run `npx vercel` after `npx vercel login`.
3. Against that same database, run `npx prisma migrate deploy` and `npx prisma db seed` if it is empty.

The app is not a static export; it needs a Node host and the database. A live production URL is not committed in this README because it depends on the reviewer’s Vercel (or other) account.

## Database migration

Existing migrations live in `prisma/migrations`.

```bash
npx prisma generate
npx prisma migrate deploy
```

`migrate deploy` applies committed migrations. Use `npx prisma migrate dev` only when creating a new migration during development. The schema in this delivery should not need new migrations.

## Seed command

```bash
npx prisma db seed
```

Password for every demo account: `Demo12345!`

## Demo accounts

| Email | Role |
| --- | --- |
| `buyer@n5deal.demo` | BUYER |
| `investor@n5deal.demo` | BUYER |
| `seller@n5deal.demo` | SELLER |
| `business@n5deal.demo` | SELLER |
| `manager@n5deal.demo` | MANAGER |

After login, buyers and sellers land on `/dashboard`. The manager lands on `/manager`.

## Available routes

| Route | Notes |
| --- | --- |
| `/` | Home, featured published assets |
| `/assets` | Asset marketplace |
| `/assets/[id]` | Published asset detail |
| `/buyers` | Buyer directory |
| `/buyers/[id]` | Active buyer profile |
| `/sellers` | Seller directory |
| `/sellers/[id]` | Active seller profile |
| `/resources` | Static content hub |
| `/login` | Sign in |
| `/register` | Sign up as buyer or seller |
| `/dashboard` | Buyer or seller cabinet (auth required) |
| `/dashboard/profile` | Buyer profile edit |
| `/dashboard/assets/new` | Create asset (seller) |
| `/dashboard/assets/[id]/edit` | Edit own asset (seller) |
| `/manager` | Manager cabinet |
| `/api/auth/login` | `POST` |
| `/api/auth/logout` | `POST` |
| `/api/auth/me` | `GET` |
| `/api/health/db` | `GET` database ping |

Unauthenticated visits to `/dashboard` or `/manager` redirect to `/login`. Wrong-role users are redirected to their cabinet.

## AI usage

AI tools were used for development assistance (UI implementation, wiring Prisma queries, and boilerplate). Architecture, data model, authorization, product scope, and the resulting implementation were reviewed manually. Generated code was checked against the existing Prisma schema, session auth, and the decision not to expand the data model.

## Key technical decisions

- **Keep the given Prisma schema.** Dual-direction contacts reuse `ContactRequest` instead of adding models or migrations.
- **`getCurrentUser()` is the authorization source of truth.** Mutations go through server actions or existing auth routes.
- **Driver adapter (`pg`) rather than Prisma’s older URL engine**, matching Prisma 7 in this repo.
- **URL state for marketplaces** so filters survive refresh and are shareable.
- **Split client-safe helpers from Prisma access** so the client bundle never loads the database client.
- **Resources stay static.** There is no CMS or `Resource` model; that kept schema changes out of scope.
- **Registration is limited to BUYER and SELLER.** Manager remains a seeded operator account.

## Assumptions and limited scope

- One PostgreSQL database (originally used with Neon) is enough for the prototype.
- Ukrainian copy is sufficient; there is no i18n layer.
- Demo seed data is acceptable for review; production identity verification is out of scope.
- “Saved assets” is a dashboard placeholder, not a data feature (no save model).
- Resource cards are a content mock; full articles were deferred.
- No automated test suite ships with this delivery.
- Image uploads, notifications, and messaging threads are out of scope.

## What could be improved with more time

- Persist resources and add article detail routes
- Saved listings and seller profile editing
- Manager pagination, audit log, and confirmation beyond the browser dialog
- Automated tests for authz, contact rules, and marketplace queries
- Email notifications when a contact request is sent or answered
- Asset media uploads and richer seller presentation
- i18n (Ukrainian / English)
- Rate limiting and tighter registration abuse controls
