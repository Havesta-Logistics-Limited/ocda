# OCDA — Ojobeda Community Development Association

The website for OCDA: public pages plus a self-service admin dashboard for
editing every piece of content — no code changes needed after launch.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Prisma + Postgres + a
small custom admin auth system (bcrypt + signed session cookie — no
third-party accounts required).

## Local setup

```bash
npm install
cp .env.example .env
# edit .env:
#  - DATABASE_URL: a Postgres connection string (Netlify DB, Neon, Supabase,
#    or local Postgres all work)
#  - SESSION_SECRET: a random string, e.g. `openssl rand -base64 32`
npm run db:migrate   # applies the schema to your database
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

Deployed on Netlify (see `netlify.toml` — its build command runs
`prisma migrate deploy` before `next build`, so the schema is always applied
on deploy):

1. Provision a Postgres database (Netlify DB, backed by Neon, is the
   easiest — one click from the site's Database tab).
2. Set `DATABASE_URL` (the database's connection string) and
   `SESSION_SECRET` as environment variables on the site.
3. Deploy. Visit `/admin/setup` once, live, to create your admin account —
   there is no default/seeded password anywhere in this repo.

## Security notes

- No admin credentials are ever committed to this repo. The first account is
  created interactively at `/admin/setup`, which locks itself once an admin
  exists.
- Admin sessions are signed, `httpOnly` cookies (14-day expiry).
- The contact form has a honeypot field and server-side validation.
- Image uploads are limited to 5MB and common image MIME types, and only
  admins can upload.
