# React + Node.js (Vite) Template

Fullstack template: **React 19** (Vite 7) frontend and **Node.js** (Express, TypeScript) backend with PostgreSQL, Prisma, and JWT auth (HttpOnly refresh cookie). Docker support included.

For how the pieces fit together (auth, proxies, database, env), see **[Architecture.md](./Architecture.md)**.

## Prerequisites

- **Node.js** (current LTS recommended)
- **Docker** (for Postgres locally and for the full container stack)

## Setup

1. **Install dependencies** (from the repo root):

   ```bash
   npm run install:all
   ```

2. **Backend environment** — copy the example and edit secrets as needed:

   ```bash
   cp backend/.env.example backend/.env.local
   ```

   Ensure `DATABASE_URL` matches your Postgres (default from `db:up` is usually fine).

3. **Start Postgres**:

   ```bash
   npm run db:up
   ```

4. **Apply database schema**:

   ```bash
   npm run db:migrate
   ```

5. **Seed demo users** (optional, recommended for trying login):

   ```bash
   npm run db:seed
   ```

   | Email | Password |
   |-------|----------|
   | `demo@example.com` | `Password123!` (or `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` from env) |
   | `admin@example.com` | `AdminPass123!` |
   | `member@example.com` | `MemberPass123!` |

## Start the project

### Local development (recommended)

Runs Vite and the backend on your machine; Postgres stays in Docker.

```bash
npm run dev
```

- **App:** [http://localhost:5173](http://localhost:5173) (Vite proxies `/api` to the backend — keep **`VITE_API_URL` unset** so cookies work.)
- **API directly:** [http://localhost:3001](http://localhost:3001)

Run only one side if needed:

```bash
npm run dev:backend
npm run dev:frontend
```

### Docker (production-like)

Full stack in containers; browser uses **port 3000** only (nginx serves the SPA and proxies `/api`). **`VITE_API_URL` should stay unset** in the build.

```bash
npm run docker:up:prod
```

Open [http://localhost:3000](http://localhost:3000). Backend is also reachable at [http://localhost:3001](http://localhost:3001); Postgres on `localhost:5432`.

Stop the stack:

```bash
npm run docker:down:prod
```

## Common commands

| Command | Purpose |
|---------|---------|
| `npm run db:down` | Stop local Postgres |
| `npm run db:logs` | Tail Postgres logs |
| `npm run db:ps` | Postgres container status |
| `npm run build` | Build backend and frontend |

More scripts, environment variables, and auth details are in [Architecture.md](./Architecture.md). Per-package notes: `frontend/README.md`, `backend/README.md`.

## Frontend UI

The SPA uses a small **UI primitive layer** in [`frontend/src/ui`](./frontend/src/ui): Tailwind-styled `Button`, `Input`, `Label`, `Text`, and `Heading` that forward native DOM props and refs so pages stay straightforward React. **Design tokens** (colors, radii) live in [`frontend/src/index.css`](./frontend/src/index.css) under Tailwind’s `@theme` block. **App-specific** chrome (navbar, layout) stays in [`frontend/src/components`](./frontend/src/components). See [Architecture.md — Frontend](./Architecture.md#frontend) for how this fits the rest of the stack and how you might swap in a heavier library later.

## Using this as a template

1. Clone or use **Use this template** on GitHub.
2. Run through **Setup** and **Start** above to verify everything works.
3. Replace the sample UI/API with your own features.

Use git only from the **repository root** (single monorepo; do not run `git init` inside `backend/` or `frontend/`).
