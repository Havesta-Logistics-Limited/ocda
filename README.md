# OCDA — Ojobeda Community Development Association

The website for OCDA: public pages plus a self-service admin dashboard for
editing every piece of content — no code changes needed after launch.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Prisma + SQLite (dev) /
Postgres (production) + a small custom admin auth system (bcrypt + signed
session cookie — no third-party accounts required).

## Local setup

```bash
npm install
cp .env.example .env
# edit .env: set SESSION_SECRET to a random string, e.g.
#   openssl rand -base64 32
npm run db:migrate   # creates prisma/dev.db and applies the schema
npm run dev          # http://localhost:3000
```

Visit `/admin` — since no admin account exists yet, you'll land on
`/admin/setup` to create the first one. After that, sign in at `/admin/login`.

## Editing content

Everything is editable from `/admin` once signed in:

- **Page content** (hero text, mission, programs, values, leadership, Get
  Involved copy, donate details, contact info, footer) — click into any
  section from the dashboard; changes go live immediately on save.
- **News & Events** — `/admin/news`. Add posts, mark them as news or events
  (events get a date + location), publish/unpublish, delete.
- **Gallery** — `/admin/gallery`. Add photos by pasting a URL or uploading
  directly from your computer (stored in the database — no external image
  host required to get started).
- **Messages** — `/admin/messages`. Everything submitted through the public
  Contact form lands here.
- **Settings** — `/admin/settings`. Change your admin password.

Images can be added either as an uploaded file or a pasted URL anywhere
you see an image field (hero photo, team photos, post covers, gallery).

## Content model

Structured, database-backed — see `prisma/schema.prisma`:

- `SiteContent` — one JSON row per editable block (schema + draft copy in
  `src/lib/content-schema.ts`, which also drives the admin editor forms).
- `Post` — news posts and events (`kind: "news" | "event"`).
- `GalleryImage`, `Upload` (uploaded file bytes), `ContactMessage`,
  `AdminUser`.

## Deploying

The app runs anywhere Next.js runs. For a serverless host like Vercel, SQLite
won't persist between requests, so switch to Postgres first:

1. Create a free Postgres database (e.g. [Neon](https://neon.tech)).
2. In `prisma/schema.prisma`, change the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set `DATABASE_URL` (your Postgres connection string) and `SESSION_SECRET`
   as environment variables on the host.
4. Set the build command to `prisma migrate deploy && next build` (or run
   `npm run db:deploy` once as part of your deploy pipeline) so the schema is
   applied to the new database.
5. Deploy. Visit `/admin/setup` once, live, to create your admin account —
   there is no default/seeded password anywhere in this repo.

## Security notes

- No admin credentials are ever committed to this repo. The first account is
  created interactively at `/admin/setup`, which locks itself once an admin
  exists.
- Admin sessions are signed, `httpOnly` cookies (14-day expiry).
- The contact form has a honeypot field and server-side validation.
- Image uploads are limited to 5MB and common image MIME types, and only
  admins can upload.
