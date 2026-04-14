# Frontend

React (Vite + TypeScript + Tailwind CSS) app for the React + Node.js template. Includes login/signup flows, token refresh, and protected routes.

## Development

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- Backend running at `http://localhost:3001` (or use root `npm run dev` to run both)

### Install dependencies

From the **repository root** (recommended):

```bash
npm run install:all
```

Or from this directory:

```bash
cd frontend
npm install
```

### Run the frontend

**Option A: From repository root** (runs frontend and backend together)

```bash
npm run dev
```

**Option B: From this directory** (frontend only; ensure backend is running separately)

```bash
cd frontend
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) with hot module replacement (HMR).

### API proxy

In development, Vite proxies `/api` to `http://localhost:3001`. So the app can call `/api/hello` (and other API routes) without setting `VITE_API_URL` or dealing with CORS. The backend must be running on port 3001 for API calls to work.

### Auth flow in template

- Login and signup call `/api/auth/*` with `credentials: "include"` so the backend can set an **HttpOnly refresh cookie** (not readable from JS).
- Access token is returned in JSON and attached as a **Bearer** header for protected requests.
- On load, the app calls `POST /api/auth/refresh` (cookie sent automatically) to obtain a new access token when a session exists.
- `/home` is protected by a route guard and redirects to `/login` when unauthenticated.

### Scripts

| Script   | Description                          |
|----------|--------------------------------------|
| `dev`    | Start Vite dev server               |
| `build`  | TypeScript check + production build |
| `preview`| Serve production build locally      |
| `lint`   | Run ESLint                          |

### Environment

Frontend variable sources by environment:

- Local Docker (`docker-compose.local.yml`): `VITE_API_URL` is hardcoded to `http://localhost:3001` in compose build args.
- Dev Docker (`docker-compose.dev.yml`): `VITE_API_URL` is read from the compose environment and falls back to `http://localhost:3001`.
- Prod Docker (`docker-compose.prod.yml`): `VITE_API_URL` must be set explicitly before `docker compose up`.
- Vite local dev (`npm run dev`): leave `VITE_API_URL` unset so `/api` proxy is used.

See `.env.example` for optional frontend env variables.

| Variable       | Description | When to set |
|----------------|-------------|-------------|
| `VITE_API_URL` | Backend base URL (no trailing slash) | Leave unset in local dev (proxy is used). Set for production or Docker (e.g. `http://localhost:3001`). |

### Stack

- **React 19** — UI
- **Vite 7** — dev server and build
- **TypeScript** — types
- **Tailwind CSS 4** — styling (`@tailwindcss/vite` in `vite.config.ts`)

### Production

```bash
npm run build
```

Output is in `dist/`. To test the production build locally:

```bash
npm run preview
```

For Docker, the root `docker compose up --build` builds and serves the frontend (e.g. on port 3000).
