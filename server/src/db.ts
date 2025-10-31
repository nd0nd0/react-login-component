import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'app.db');
const schemaPath = path.join(__dirname, 'schema.sql');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Pragmas for better behavior
try {
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
} catch (e) {
  const err = e as Error;
  console.warn('SQLite pragmas not applied:', err.message);
}

// Apply schema
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
db.exec(schemaSql);

export default db;
