import db from './db';

export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
}

export interface NewUser {
  email: string;
  passwordHash: string;
  name?: string | null;
}

export function getUserByEmail(email: string): UserRow | undefined {
  const stmt = db.prepare('SELECT id, email, password_hash, name FROM users WHERE email = ?');
  const user = stmt.get(email) as UserRow | undefined;
  return user;
}

export function createUser({ email, passwordHash, name }: NewUser): { id: number; email: string; name: string | null } {
  const stmt = db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
  const info = stmt.run(email, passwordHash, name ?? null);
  return { id: Number(info.lastInsertRowid), email, name: name ?? null };
}

export function countUsers(): number {
  const stmt = db.prepare('SELECT COUNT(*) as cnt FROM users');
  const row = stmt.get() as { cnt: number };
  return row.cnt;
}
