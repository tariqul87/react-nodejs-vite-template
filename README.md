# React + Node.js (Vite) Template

Fullstack template: **React 19** (Vite 7) frontend and **Node.js** (Express, TypeScript) backend. Includes Docker setup and a simple API example.

## Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript, CORS
- **Dev:** Vite proxy (same-origin in dev), optional root `npm run dev` to run both

## Quick start

### Option 1: Local development (recommended)

1. Install dependencies (from repo root):

   ```bash
   npm run install:all
   ```

2. Run frontend and backend together:

   ```bash
   npm run dev
   ```

   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - Backend: [http://localhost:3001](http://localhost:3001)  
   - In dev, the frontend proxies `/api` to the backend, so no CORS or `VITE_API_URL` needed.

3. Or run separately:

   ```bash
   npm run dev:backend   # backend only
   npm run dev:frontend  # frontend only
   ```

### Option 2: Docker

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend: [http://localhost:3001](http://localhost:3001)  

When using Docker, set `VITE_API_URL=http://localhost:3001` in the frontend (e.g. in build args or env) so the browser can reach the API.

## Environment

### Frontend (`frontend/.env`)

| Variable        | Description |
|----------------|-------------|
| `VITE_API_URL` | Backend base URL (no trailing slash). Leave unset in local dev when using the Vite proxy. Set for production or Docker (e.g. `http://localhost:3001`). |

See `frontend/.env.example`.

### Backend (`backend/.env`)

| Variable      | Description |
|---------------|-------------|
| `PORT`        | Server port (default: `3001`). |
| `CORS_ORIGIN`| Comma-separated allowed origins (default: `http://localhost:5173`, `http://localhost:3000`). |

See `backend/.env.example`.

## Scripts

From **root**:

- `npm run dev` — run frontend and backend in parallel
- `npm run build` — build backend and frontend
- `npm run install:all` — install root, backend, and frontend deps

From **backend** or **frontend**:

- Use each app’s own `package.json` scripts (e.g. `npm run dev`, `npm run build`).
- See `frontend/README.md` and `backend/README.md` for detailed development instructions per package.

## Git

Use git only from the **repository root**. Do not run `git init` in `backend/` or `frontend/`; the root `.gitignore` excludes nested `backend/.git` and `frontend/.git` so the repo stays a single root-level project.

## Using this as a template

1. Clone or use “Use this template.”
2. Run `npm run install:all`, then `npm run dev` to confirm everything works.
3. Replace the demo “Fetch Message” flow with your own API and UI.
4. Adjust CORS, env, and Docker as needed for your deployment.
