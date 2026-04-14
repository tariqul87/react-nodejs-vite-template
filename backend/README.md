# Backend

Node.js (Express + TypeScript) API for the React + Node.js template. Uses Prisma + PostgreSQL and includes JWT auth: **access token in JSON**, **refresh token in an HttpOnly cookie** (`Path=/api/auth`), plus **per-IP rate limits** on signup, login, and refresh.

## Development

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Install dependencies

From the **repository root** (recommended):

```bash
npm run install:all
```

Or from this directory:

```bash
cd backend
npm install
```

### Run the backend

**Option A: From repository root** (runs backend and frontend together)

```bash
npm run dev
```

**Option B: From this directory** (backend only)

```bash
cd backend
npm run dev
```

The server runs at [http://localhost:3001](http://localhost:3001). It reloads on file changes (via `tsx watch`).

### Scripts

| Script   | Description                                      |
|---------|--------------------------------------------------|
| `dev`   | Start dev server with hot reload (`tsx watch`)   |
| `build` | Compile TypeScript to `dist/`                    |
| `start` | Run production build (`node dist/index.js`)     |
| `prisma:generate` | Generate Prisma client |
| `prisma:migrate:dev` | Create/apply migrations in development |
| `prisma:migrate:deploy` | Apply existing migrations in non-dev envs |
| `seed:demo-user` | Create demo login user from env values |

### Environment

Backend env naming convention:

- `backend/.env.example` -> local template (copy to `.env.local`)
- `backend/.env.local` -> local runtime values for `docker-compose.local.yml`
- `backend/.env.dev` -> dev/staging values for `docker-compose.dev.yml`
- `backend/.env.prod.example` -> production template (copy to `.env.prod`)
- `backend/.env.prod` -> production runtime values for `docker-compose.prod.yml`

Create runtime files from templates before running Docker overlays:

```bash
cp backend/.env.example backend/.env.local
cp backend/.env.prod.example backend/.env.prod
```

| Variable     | Description | Default |
|-------------|-------------|---------|
| `PORT`      | Server port | `3001`  |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `http://localhost:5173`, `http://localhost:3000` |
| `DATABASE_URL` | Postgres connection string for Prisma | required |
| `JWT_ACCESS_SECRET` | JWT secret for access tokens | required |
| `JWT_REFRESH_SECRET` | JWT secret for refresh tokens | required |

### API structure

- Entry: `src/index.ts` — Express app, CORS (`credentials: true`), cookies, `/api` router
- Routes: `src/api/` — Mounted at `/api` (e.g. `/api/auth/*`, `/api/hello`, `/api/users`, `/api/accounts`)
- Rate limits: `src/middleware/rateLimitAuth.ts` — applied on `/api/auth/signup`, `/login`, `/refresh`

Add new route modules under `src/api/` and register them in `src/api/index.ts`.

### Production

```bash
npm run build
npm start
```

Or run via Docker from the repository root: `docker compose up --build`.
