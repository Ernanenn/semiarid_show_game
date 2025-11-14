import Database from 'better-sqlite3';
import { readFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, 'schema.sql');

let databaseInstance = null;

export function getDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  // Create database directory if it doesn't exist
  const dbPath = env.databasePath;
  const dbDir = path.dirname(dbPath);
  
  try {
    mkdirSync(dbDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's okay
  }

  const db = new Database(dbPath);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Apply schema
  try {
    const schema = readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    // If tables already exist, that's okay
    if (error.message.includes('already exists')) {
      console.log('Database tables already exist');
    } else {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  databaseInstance = new Sqlite3Database(db);
  return databaseInstance;
}

export function initDatabase() {
  getDatabase();
  console.log('Database initialized and migrations applied.');
}

export function closeDatabase() {
  if (databaseInstance && databaseInstance.db) {
    databaseInstance.db.close();
    databaseInstance = null;
  }
}

// Database wrapper to match the interface
class Sqlite3Database {
  constructor(db) {
    this.db = db;
  }

  async run(sql, params = []) {
    const stmt = this.db.prepare(sql);
    const result = stmt.run(...params);
    return {
      lastInsertRowid: result.lastInsertRowid || null,
      changes: result.changes || 0,
    };
  }

  async get(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.get(...params) || null;
  }

  async all(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params);
  }
}

