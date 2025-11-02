## react-auth-flow — Vite + React Auth (client) • Express + SQLite (server)

Tiny full-stack starter that demonstrates an accessible login/register flow with React Router navigation and a TypeScript Express API using TanStack Query for client-server communication.

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

## App Structure & Routing

The app uses React Router for navigation with clean page separation:

**Pages & Routes:**
- **Home (`/`)** - Landing page with animated splash screen; shows "Log in" and "Create account" buttons for unauthenticated users
- **Login (`/login`)** - Sign in form with email/password validation; navigates to dashboard on success
- **Register (`/register`)** - User registration form with name/email/password validation; navigates to dashboard on success  
- **Dashboard (`/dashboard`)** - Protected welcome page for authenticated users; shows user info and logout functionality

**Navigation Flow:**
1. Start at Home (splash screen) → click "Log in" or "Create account"
2. Complete Login or Register → automatically navigate to Dashboard
3. From Dashboard → click "Logout" → return to Home

Each page has a single responsibility and consistent styling with the orange gradient hero design.

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
- React Router declarative routing with page-based architecture
- Tailwind v4 utilities (e.g., bg-linear-to-b)
- TanStack Query handles login/register mutations with automatic loading/error states
- Vite dev proxy forwards /api requests to the Express server (port 3001)
- Consistent orange gradient hero design across all pages
 
Client additions
- Pages: client/src/pages/ → Home (splash), Login, Register, Dashboard (welcome)
- Components: client/src/components/Register.tsx (animated, validated register form)
- Hooks: client/src/hooks/useRegisterMutation.ts (TanStack Query mutation)
- API client: client/src/api/auth.ts → registerUser()
- Routing: React Router setup in main.tsx with declarative navigation

Server additions
- Endpoint: POST /api/auth/register (creates user, returns { ok, user })
- DB: users table already includes email uniqueness and password_hash storage

Try it
1) Start both apps: pnpm dev
2) Visit the home page to see the splash screen with panda/character illustration
3) Click "Create account" to register or "Log in" to sign in with existing credentials
4) Complete the form → you'll be automatically redirected to your personal dashboard
5) From the dashboard, click "Logout" to return to the home splash screen

The app demonstrates a complete user journey from landing to authentication to a personalized dashboard experience.
