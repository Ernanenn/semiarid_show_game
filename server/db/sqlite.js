import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');
const wasmPath = path.resolve(projectRoot, 'node_modules/sql.js/dist/sql-wasm.wasm');
const schemaPath = path.resolve(__dirname, 'schema.sql');

class SqlJsDatabase {
  constructor(database, filePath) {
    this.database = database;
    this.filePath = filePath;
    this.inTransaction = false;
  }

  async applyMigrations() {
    const schema = await fs.readFile(schemaPath, 'utf-8');
    this.database.exec(schema);
    await this.persist();
  }

  async persist() {
    const data = this.database.export();
    const buffer = Buffer.from(data);
    await fs.writeFile(this.filePath, buffer);
  }

  async run(sql, params = []) {
    const statement = this.database.prepare(sql);
    try {
      if (params && params.length > 0) {
        statement.bind(params);
      }
      statement.step();
      const lastInsertRowid = this.database.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || null;
      await this.persist();
      return { lastInsertRowid, changes: 1 };
    } finally {
      statement.free();
    }
  }

  get(sql, params = []) {
    const statement = this.database.prepare(sql);
    try {
      if (params && params.length > 0) {
        statement.bind(params);
      }
      if (statement.step()) {
        return statement.getAsObject();
      }
      return null;
    } finally {
      statement.free();
    }
  }

  all(sql, params = []) {
    const statement = this.database.prepare(sql);
    const results = [];
    try {
      if (params && params.length > 0) {
        statement.bind(params);
      }
      while (statement.step()) {
        results.push(statement.getAsObject());
      }
    } finally {
      statement.free();
    }
    return results;
  }

  async transaction(callback) {
    if (this.inTransaction) {
      throw new Error('Nested transactions are not supported.');
    }

    this.inTransaction = true;
    this.database.exec('BEGIN');

    try {
      const result = await callback(this);
      this.database.exec('COMMIT');
      await this.persist();
      return result;
    } catch (error) {
      this.database.exec('ROLLBACK');
      throw error;
    } finally {
      this.inTransaction = false;
    }
  }
}

let databaseInstance = null;

export async function getDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  await fs.mkdir(path.dirname(env.databasePath), { recursive: true });

  const SQL = await initSqlJs({
    locateFile: () => wasmPath,
  });

  let fileBuffer = null;
  try {
    fileBuffer = await fs.readFile(env.databasePath);
  } catch {
    // File does not exist yet – it will be created on persist.
  }

  const database = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();
  const wrappedDatabase = new SqlJsDatabase(database, env.databasePath);
  await wrappedDatabase.applyMigrations();

  databaseInstance = wrappedDatabase;
  return databaseInstance;
}

export async function initDatabase() {
  await getDatabase();
  console.log('Database initialized and migrations applied.');
}

