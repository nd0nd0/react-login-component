## Vite + React Login + Splash (client) • Express + SQLite (server)

Tiny full-stack starter with an animated splash, accessible login, and a TypeScript Express API.

Highlights
- Splash screen (Framer Motion), matching login UI (Tailwind v4)
- Form validation with React Hook Form + Zod
- API integration with TanStack Query (React Query) for server state
- Server: Express + better-sqlite3 + bcryptjs (TypeScript)
- Tests: Vitest + React Testing Library
- Fonts: Inter (body) + Outfit (headings)

Quick start (Node 18+, pnpm)
```bash
# from the repo root (pnpm workspace: client + server)
pnpm install
pnpm dev   # runs client and server together
```

Dev URLs
- Client: http://localhost:5173
- Server: http://localhost:3001

Build & run (server will serve the built client)
```bash
pnpm build
pnpm start
```

Tests
```bash
pnpm test              # run client tests
pnpm -C client test:ui # optional Vitest UI
```

API
- POST /api/auth/login → { ok, user } (email + password)
- GET  /api/health      → { ok, env }

Demo credentials
- Email: admin@example.com
- Password: password123

Notes
- Monorepo via pnpm workspace (client + server)
- Tailwind v4 utilities (e.g., bg-linear-to-b)
- TanStack Query handles login mutations with automatic loading/error states
- Vite dev proxy forwards /api requests to the Express server (port 3001)
