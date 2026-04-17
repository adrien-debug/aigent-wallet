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

## API (v1)

Base: `/api/v1`. Découverte: `GET /api/v1` (liste des routes).

| Méthode | Route | Description |
|--------|--------|--------------|
| GET | `/api/v1/metrics` | KPIs + séries (volume, spend, risk) |
| GET | `/api/v1/wallets` | Liste des wallets |
| GET | `/api/v1/wallets/:id` | Détail wallet |
| GET | `/api/v1/transactions` | `?status=confirmed|pending|failed|blocked|all`, `?q=`, `?walletId=` |
| GET | `/api/v1/policies` | Liste des policies |
| GET | `/api/v1/policies/:id` | Détail policy |
| GET | `/api/v1/audit` | Événements d’audit |
| GET | `/api/v1/alerts` | Alertes risque |
| GET | `/api/v1/team` | Membres (mock) |
| GET | `/api/v1/pricing` | Plans tarifaires (mock) |

Réponses: `{ ok: true, data: ... }` ou `{ ok: false, error: { code, message } }`. Données = mocks `data/*` (prêt pour brancher une DB).

## Deploy

- **GitHub:** https://github.com/adrien-debug/aigent-wallet
- **Production (Vercel):** https://aigent-wallet.vercel.app

Git → Vercel : le projet est lié au dépôt ; chaque push sur `main` redéploie.
