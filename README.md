# Qanun

Qatar regulatory library. Laws, circulars, rulebooks and frameworks for financial
services, real estate & construction, energy & utilities, and telecom & ICT —
broken into individual requirements linked to the official clause.

## Development

```bash
pnpm install
pnpm approve-builds --all   # required once after fresh install (pnpm v12)
pnpm dev                    # http://localhost:3000
```

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
pnpm test        # vitest run
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_INDEXING` | _(unset)_ | Set to `"true"` to allow search engine indexing. When unset or any other value, every response carries `X-Robots-Tag: noindex, nofollow`, `/robots.txt` disallows all crawlers, and the HTML `<meta name="robots">` is set to `noindex, nofollow`. The site remains publicly accessible. |

**Default is off.** Set `NEXT_PUBLIC_SITE_INDEXING=true` only on the production
domain once the library is ready to launch. Leave it unset on all preview and
staging deployments.

## Deploy to Vercel

### First deploy

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no framework override needed.
4. Before deploying, open **Environment Variables** and add:
   - `NEXT_PUBLIC_SITE_INDEXING` — leave the value blank (search engines blocked).
5. Click **Deploy**.

### Subsequent deploys

Every push to `main` triggers a production deployment automatically.
Every pull request gets a preview URL.

### Going live (search engines on)

1. In the Vercel dashboard, go to **Settings → Environment Variables**.
2. Set `NEXT_PUBLIC_SITE_INDEXING` to `true` for the **Production** environment only.
3. Redeploy (or trigger a new push) for the change to take effect.
4. Verify: `curl -I https://qanun.qa/ | grep -i x-robots-tag` should return nothing.

### Rollback

Use **Deployments → Promote to Production** in the Vercel dashboard, or:

```bash
vercel rollback [deployment-url]
```

## Project structure

```
src/
  app/
    (marketing)/        # Landing page, coming-soon pages, OG image
    robots.ts           # /robots.txt — disallows all when indexing is off
    layout.tsx          # Root layout: fonts, robots metadata
  middleware.ts         # X-Robots-Tag header on every response
  components/
    ui/                 # Button, Input, Select, Badge, StatusChip, …
    library/            # InstrumentRow
    layout/             # Header, HeroCheck, SearchBar
  data/mock.ts          # Sample data (replaced by Supabase in session 2)
  lib/
    queries/            # Async data functions — signatures stable across sessions
    copy/en.ts          # All user-facing strings
    utils/              # Formatting helpers
  types/index.ts        # Shared TypeScript types
  styles/tokens.css     # Design token system (light + dark)
```

## Session roadmap

| Session | Scope |
|---|---|
| 1 ✓ | Scaffold, types, mock data, landing page, design tokens |
| 2 | Supabase, auth, library/check/updates routes |
| 3 | Python ingestion worker, AI requirement drafting |
