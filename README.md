# Aigent (demo)

Next.js 14 (App Router) marketing site + wallet console with mock data.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run test` — Vitest (`lib/api/*.test.ts`, `lib/supabase/*.test.ts`)
- `npm run test:e2e` — Playwright (smoke + auth guards). First run: `npm run test:e2e:install`.
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

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (see `.env.example`):

- Middleware refreshes the session; **`/app` and `/app/*` require a signed-in user** (redirect to `/login`).
- **`/login`** — email magic link (`signInWithOtp`).
- **`GET /auth/callback`** — exchanges OAuth / magic-link `code` for session cookies (optional query `next` must be a safe relative path).
- **`POST /auth/signout`** — ends the session and redirects to `/login` (POST-only to block CSRF; topbar uses a same-origin form).

Without these env vars, the marketing CTAs open **`/app` directly** (demo session label in the console top bar).

**Redirect URL (Supabase Dashboard → Authentication → URL configuration):**

- Local: `http://localhost:3000/auth/callback`
- Production (Railway): `https://aigent-web-production.up.railway.app/auth/callback`

**Preview / branching:** map **Preview** environment variables to a Supabase **branch** (or separate project) URL and anon key so preview deployments do not hit production auth.

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

Sans variable d’environnement, l’API reste ouverte (warning en logs) — pratique en local uniquement. **En production Railway, la clé est setée** : toute requête `/api/v1/*` sans Bearer renvoie `401`.

### CORS (optionnel)

`AIGENT_CORS_ORIGIN` = origine exacte du front (ex. `https://aigent-web-production.up.railway.app`). Active `OPTIONS` + en-têtes sur les réponses `/api/v1/*` lorsque le navigateur envoie le même `Origin`.

### POST (stubs + mémoire)

- **`POST /api/v1/wallets`** — JSON : `name`, `type`, `network`, `agent`, `dailyCapUsd` ; optionnels : `policyId`, `policyName`, `parentId`, `tags`. **201** — entité ajoutée au store mémoire ; visible dans `GET /api/v1/wallets` tant que l’instance est chaude.
- **`POST /api/v1/policies`** — JSON : `name`, `description`, `condition`, `severity` ; optionnel : `status`. **201** — idem, fusionné dans `GET /api/v1/policies`.

### OpenAPI

`GET /api/v1/openapi` — contrat machine-readable (importable dans Postman / codegen).

## Deploy

- **GitHub:** https://github.com/adrien-debug/aigent-wallet
- **Production (Railway):** https://aigent-web-production.up.railway.app
- **Supabase project:** `bwfkvpncgzybglultpsx` (eu-west-1) — [Dashboard](https://supabase.com/dashboard/project/bwfkvpncgzybglultpsx)

### Railway

Projet : `aigent-wallet` / service `aigent-web`. Variables d'env configurées dans Railway : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AIGENT_API_KEY`, `AIGENT_CORS_ORIGIN`, `PORT=3000`.

**Auto-deploy** (deux options, choisir une) :

1. **GitHub Actions** (`.github/workflows/deploy.yml`) — créer un project token (Railway Dashboard → Project Settings → Tokens), l'ajouter dans GitHub → Settings → Secrets → Actions sous le nom `RAILWAY_TOKEN`. Push sur `main` déploie automatiquement.
2. **GitHub natif Railway** — Service Settings → Source → connect GitHub repo. Auto-deploy sur push + previews PR.

**Déploiement manuel** : `railway up`.

### Supabase

Config locale dans `supabase/config.toml`. Pousser les changements auth/API : `supabase config push`. Redirect URLs configurées pour `localhost:3000` + Railway.

**Migrations** (`supabase/migrations/`) — schéma `profiles` (1:1 `auth.users`) + tables `wallets` / `policies` / `transactions` avec **RLS owner-only** (`auth.uid() = user_id`). Appliquer : `supabase db push`. Le trigger `on_auth_user_created` provisionne automatiquement `public.profiles` à l'inscription.

## Sécurité

- **Headers** (`next.config.mjs`) : HSTS 2 ans, CSP self + Supabase, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal, `X-Content-Type-Options: nosniff`.
- **Sign-out** POST-only (CSRF).
- **API v1** Bearer obligatoire en prod (`AIGENT_API_KEY`).
- **Dependabot** (`.github/dependabot.yml`) — PRs hebdo (npm groupés Next/Radix/Vitest/types + GitHub Actions).
- **Healthcheck Railway** — `GET /api/health`, restart `ON_FAILURE` x3 (`railway.toml`).
