import path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

// Ensure DB initialized
import './db';
import { getUserByEmail, createUser, countUsers } from './users';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const NODE_ENV = (process.env.NODE_ENV || 'development') as 'development' | 'production' | string;

app.use(express.json());

if (NODE_ENV !== 'production') {
  app.use(cors({ origin: /http:\/\/localhost:\d+$/, credentials: false }));
}

// Seed a demo user if empty
(function seedDemo() {
  try {
    if (countUsers() === 0) {
      const email = 'admin@example.com';
      const passwordHash = bcrypt.hashSync('password123', 10);
      createUser({ email, passwordHash, name: 'Admin' });
      console.log('Seeded demo user: admin@example.com / password123');
    }
  } catch (e) {
    console.error('Seeding failed:', e);
  }
})();

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, env: NODE_ENV });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = (req.body || {}) as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password required' });
  }
  const user = getUserByEmail(String(email).toLowerCase());
  if (!user) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  }
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  }
  return res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password, name } = (req.body || {}) as {
    email?: string;
    password?: string;
    name?: string;
  };
  if (!email || !password || !name) {
    return res.status(400).json({ ok: false, error: 'Name, email and password required' });
  }
  const existing = getUserByEmail(String(email).toLowerCase());
  if (existing) {
    return res.status(409).json({ ok: false, error: 'Email already registered' });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = createUser({ email: String(email).toLowerCase(), passwordHash, name: String(name) });
  return res.status(201).json({ ok: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
