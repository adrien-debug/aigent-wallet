# Aigent (demo)

Next.js 14 (App Router) marketing site + wallet console with mock data.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run test` — Vitest (`lib/api/*.test.ts`)
- `npm run format` / `npm run format:check` — Prettier

## Structure

- `app/(marketing)` — `/`, `/product`, `/security`, `/developers`, `/pricing`, `/about`
- `app/(dashboard)/app` — `/app` and nested console routes
- `components/marketing`, `components/dashboard`, `components/shared`, `components/ui`
- `data` — mock datasets
- `lib`, `types`

Data is mostly mock; API v1 can persist POSTs in memory on the instance.

**Health:** `GET /api/health` — JSON probe for uptime monitors.

## Supabase (optional)

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (see `.env.example`), middleware refreshes the auth session and `GET /auth/callback` exchanges OAuth / magic-link `code` for session cookies.

**Redirect URL (Supabase Dashboard → Authentication → URL configuration):**

- Local: `http://localhost:3000/auth/callback`
- Production: `https://<your-domain>/auth/callback`

**Preview / branching:** on Vercel, map **Preview** environment variables to a Supabase **branch** (or separate project) URL and anon key so preview deployments do not hit production auth. The dashboard UI is not yet gated on session; this is infrastructure for future auth.

## API (v1)

Base: `/api/v1`. Découverte: `GET /api/v1` (liste des routes). Version affichée = `API_VERSION` dans `lib/api/constants.ts` (alignée OpenAPI + discovery).

**Code:** couche `lib/api/*` (réponses, validation, pagination, auth middleware, catalogue d’endpoints, types `types/api.ts`).

| Méthode | Route                  | Description                                                                      |
| ------- | ---------------------- | -------------------------------------------------------------------------------- |
| GET     | `/api/v1/metrics`      | KPIs + séries (volume, spend, risk)                                              |
| GET     | `/api/v1/wallets`      | Liste des wallets (seed + mémoire)                                               |
| POST    | `/api/v1/wallets`      | Créer un wallet (mémoire)                                                        |
| GET     | `/api/v1/wallets/:id`  | Détail wallet                                                                    |
| GET     | `/api/v1/transactions` | `?status=…`, `?q=`, `?walletId=`, `?limit=` (max via `TX_MAX_LIMIT`), `?offset=` |
| GET     | `/api/v1/openapi`      | Spécification **OpenAPI 3** (JSON)                                               |
| GET     | `/api/v1/policies`     | Liste des policies (seed + mémoire)                                              |
| POST    | `/api/v1/policies`     | Créer une policy (mémoire)                                                       |
| GET     | `/api/v1/policies/:id` | Détail policy                                                                    |
| GET     | `/api/v1/audit`        | Événements d’audit                                                               |
| GET     | `/api/v1/alerts`       | Alertes risque                                                                   |
| GET     | `/api/v1/team`         | Membres (mock)                                                                   |
| GET     | `/api/v1/pricing`      | Plans tarifaires (mock)                                                          |

Réponses: `{ ok: true, data: ... }` ou `{ ok: false, error: { code, message }, requestId? }`. Header **`x-request-id`** sur chaque réponse. Données wallets/policies = seeds `data/*` **+** créations **POST** tenues en mémoire sur l’instance (perdu au cold start serverless).

### Auth (Bearer)

Si `AIGENT_API_KEY` est défini (voir `.env.example`), toutes les routes **`/api/v1/*`** exigent :

`Authorization: Bearer <valeur de AIGENT_API_KEY>`

Sans variable d’environnement, l’API reste ouverte (warning en logs) — pratique en local uniquement.

### CORS (optionnel)

`AIGENT_CORS_ORIGIN` = origine exacte du front (ex. `https://aigent-wallet.vercel.app`). Active `OPTIONS` + en-têtes sur les réponses `/api/v1/*` lorsque le navigateur envoie le même `Origin`.

### POST (stubs + mémoire)

- **`POST /api/v1/wallets`** — JSON : `name`, `type`, `network`, `agent`, `dailyCapUsd` ; optionnels : `policyId`, `policyName`, `parentId`, `tags`. **201** — entité ajoutée au store mémoire ; visible dans `GET /api/v1/wallets` tant que l’instance est chaude.
- **`POST /api/v1/policies`** — JSON : `name`, `description`, `condition`, `severity` ; optionnel : `status`. **201** — idem, fusionné dans `GET /api/v1/policies`.

### OpenAPI

`GET /api/v1/openapi` — contrat machine-readable (importable dans Postman / codegen).

## Deploy

- **GitHub:** https://github.com/adrien-debug/aigent-wallet
- **Production (Vercel):** https://aigent-wallet.vercel.app

Git → Vercel : le projet est lié au dépôt ; chaque push sur `main` redéploie. Pour Supabase + previews, utiliser une branche Git dédiée et des variables **Preview** Vercel alignées sur une branche ou un projet Supabase séparé.
