## Vite + React Login with Splash Screen

A small, modern login flow built with React + TypeScript. It ships with:
- Animated splash screen (Framer Motion)
- Accessible login form (React Hook Form + Zod)
- Tailwind CSS styling (v4)
- Tests with Vitest + React Testing Library

### Features
- Splash screen with orange gradient hero and subtle sparkles
- Login screen visually matched to the splash (light form section, orange CTA)
- Zod-powered validation: valid email + min 6 character password
- Loading/disabled state on submit, clear error messages
- Inter (body) and Outfit (headings) fonts

## Project structure

```
src/
  App.tsx                      # Splash → Login → Authenticated flow
  main.tsx                     # Entry
  index.css                    # Base styles + fonts
  components/
    SplashScreen.tsx           # Animated hero section
    Login.tsx                  # RHF + Zod login form (styled like splash)
    Login.test.tsx             # Unit tests
  test/
    setup.ts                   # Test environment
    test-utils.tsx             # RTL helpers
  App.test.tsx                 # Integration tests
```

## Quick start

Requirements: Node 18+, pnpm

```bash
pnpm install
pnpm dev
```

The server prints the local URL (often http://localhost:5173 or 5174).

## Test commands

```bash
pnpm test         # run once
pnpm test --watch # watch mode
pnpm test:ui      # Vitest UI
```

## Usage

The app boots to the splash screen. Tap “Log in” to view the form.

```tsx
// Pass your submit handler; show loading and optional error
<Login onSubmit={handleLogin} isLoading={isLoading} error={error} />
```

### Demo credentials
Email: admin@example.com  
Password: password123

## API (types)

```ts
interface LoginFormData { email: string; password: string }
interface LoginProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
  error?: string
}
```

## Validation
- Email must be valid
- Password min length: 6
- Errors clear as the user types (RHF + Zod resolver)

## Tech
React 19, TypeScript, Vite, Tailwind v4, React Hook Form, Zod, Framer Motion, Vitest, React Testing Library.

## Notes
- Fonts: Inter (body), Outfit (headings)
- Tailwind v4 utilities (e.g., `bg-linear-to-b`)
- Replace the simulated API in `App.tsx` with your own service

---

MIT-like; use freely for learning and projects.
