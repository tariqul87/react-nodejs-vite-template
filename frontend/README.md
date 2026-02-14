# Frontend

React (Vite + TypeScript + Tailwind CSS) app for the React + Node.js template. Talks to the backend API for data.

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

### Scripts

| Script   | Description                          |
|----------|--------------------------------------|
| `dev`    | Start Vite dev server               |
| `build`  | TypeScript check + production build |
| `preview`| Serve production build locally      |
| `lint`   | Run ESLint                          |

### Environment

Create a `.env` file in this directory when needed. See `.env.example`.

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
