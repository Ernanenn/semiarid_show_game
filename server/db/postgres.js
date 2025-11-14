import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { env } from '../config/env.js';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, 'schema-postgres.sql');

let pool = null;

export function getPool() {
  if (pool) {
    return pool;
  }

  // Parse DATABASE_URL or use individual connection parameters
  let config = {};
  
  if (env.databaseUrl) {
    // Parse DATABASE_URL format: postgresql://user:password@host:port/database
    const url = new URL(env.databaseUrl);
    config = {
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      database: url.pathname.slice(1), // Remove leading '/'
      user: url.username,
      password: url.password,
      ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
    };
  } else {
    config = {
      host: env.dbHost || 'localhost',
      port: env.dbPort || 5432,
      database: env.dbName || 'semiarido_quiz',
      user: env.dbUser || 'postgres',
      password: env.dbPassword || '',
      ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
    };
  }

  pool = new Pool(config);
  
  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

  return pool;
}

export async function initDatabase() {
  const pool = getPool();
  
  try {
    // Read and execute schema
    const schema = readFileSync(schemaPath, 'utf-8');
    await pool.query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    // If tables already exist, that's okay
    if (error.code === '42P07') {
      console.log('Database tables already exist');
    } else {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Database wrapper to match SQLite interface
export class PostgresDatabase {
  constructor(pool) {
    this.pool = pool;
  }

  async run(sql, params = []) {
    // Convert SQLite placeholders (?) to PostgreSQL ($1, $2, ...)
    const pgSql = this.convertPlaceholders(sql);
    const result = await this.pool.query(pgSql, params);
    
    // If query has RETURNING clause, get the id from the first row
    const lastInsertRowid = result.rows[0]?.id || null;
    
    return {
      lastInsertRowid,
      changes: result.rowCount || 0,
    };
  }

  async get(sql, params = []) {
    const pgSql = this.convertPlaceholders(sql);
    const result = await this.pool.query(pgSql, params);
    return result.rows[0] || null;
  }

  async all(sql, params = []) {
    const pgSql = this.convertPlaceholders(sql);
    const result = await this.pool.query(pgSql, params);
    return result.rows;
  }

  convertPlaceholders(sql) {
    // Convert SQLite ? placeholders to PostgreSQL $1, $2, etc.
    let paramIndex = 1;
    return sql.replace(/\?/g, () => `$${paramIndex++}`);
  }
}

export async function getDatabase() {
  const pool = getPool();
  await initDatabase();
  return new PostgresDatabase(pool);
}

