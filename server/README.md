# Express Server (SQLite + better-sqlite3)

Simple Express server for the React login app.

- SQLite database stored in `server/data/app.db`
- `users` table with demo user (`admin@example.com` / `password123`)
- Login endpoint: `POST /api/auth/login` with `{ email, password }`
- Health endpoint: `GET /api/health`

## Dev

```bash
pnpm install
pnpm dev
```

## Prod

```bash
pnpm start
```

The server will serve the built React app from `../dist` when `NODE_ENV=production`.
