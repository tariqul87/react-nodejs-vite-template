# Backend

Node.js (Express + TypeScript) API for the React + Node.js template. Serves the `/api` routes used by the frontend.

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

### Environment

Create a `.env` file in this directory if you need to override defaults. See `.env.example`.

| Variable     | Description | Default |
|-------------|-------------|---------|
| `PORT`      | Server port | `3001`  |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `http://localhost:5173`, `http://localhost:3000` |

### API structure

- Entry: `src/index.ts` — Express app, CORS, `/api` router
- Routes: `src/api/` — Mounted at `/api` (e.g. `/api/hello`, `/api/users`, `/api/accounts`)

Add new route modules under `src/api/` and register them in `src/api/index.ts`.

### Production

```bash
npm run build
npm start
```

Or run via Docker from the repository root: `docker compose up --build`.
