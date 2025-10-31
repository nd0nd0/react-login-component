-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Trigger to update updated_at on row update
CREATE TRIGGER IF NOT EXISTS trg_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
END;
