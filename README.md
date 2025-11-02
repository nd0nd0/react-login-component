## react-auth-flow — Vite + React Auth (client) • Express + SQLite (server)

Tiny full-stack starter that demonstrates an accessible login/register flow and a TypeScript Express API using TanStack Query for client-server communication.

Highlights
- Polished login + register UI (Tailwind v4)
- Registration flow added: create account with name, email, and password
- Password visibility toggle for password and confirm password fields
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
- POST /api/auth/register → { ok, user } (name + email + password)
- GET  /api/health      → { ok, env }

Register endpoint
- Request body: { name: string; email: string; password: string }
- Responses:
	- 201: { ok: true, user: { id, email, name } }
	- 409: { ok: false, error: 'Email already registered' }
	- 400: { ok: false, error: 'Name, email and password required' }

Demo credentials
- Email: admin@example.com
- Password: password123

Notes
- Monorepo via pnpm workspace (client + server)
- Tailwind v4 utilities (e.g., bg-linear-to-b)
- TanStack Query handles login mutations with automatic loading/error states
- Vite dev proxy forwards /api requests to the Express server (port 3001)
 
Client additions
- Component: client/src/components/Register.tsx (animated, validated register form)
- Hook: client/src/hooks/useRegisterMutation.ts (TanStack Query mutation)
- API client: client/src/api/auth.ts → registerUser()

Server additions
- Endpoint: POST /api/auth/register (creates user, returns { ok, user })
- DB: users table already includes email uniqueness and password_hash storage

Try it
1) Start both apps: pnpm dev
2) In the client, click “Sign up” to open the Register screen
3) Enter name, email, and a password (6+ chars), then Create Account
4) You’ll be signed in automatically on success
