# Aigent (demo)

Next.js 14 (App Router) marketing site + wallet console with mock data.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Structure

- `app/(marketing)` — `/`, `/product`, `/security`, `/developers`, `/pricing`, `/about`
- `app/(dashboard)/app` — `/app` and nested console routes
- `components/marketing`, `components/dashboard`, `components/shared`, `components/ui`
- `data` — mock datasets
- `lib`, `types`

No real backend or keys; UI is illustrative.

**Health:** `GET /api/health` — JSON probe for uptime monitors.

## Deploy

- **GitHub:** https://github.com/adrien-debug/aigent-wallet
- **Production (Vercel):** https://aigent-wallet.vercel.app

Git → Vercel : le projet est lié au dépôt ; chaque push sur `main` redéploie.
