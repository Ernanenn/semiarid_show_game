import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

dotenv.config({
  path: path.resolve(projectRoot, '.env'),
});

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.parseInt(process.env.PORT ?? '4000', 10),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000',
  // PostgreSQL configuration
  databaseUrl: process.env.DATABASE_URL,
  dbHost: process.env.DB_HOST,
  dbPort: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  // SQLite (fallback for local development)
  databasePath: path.resolve(projectRoot, process.env.DATABASE_PATH ?? 'data/app.sqlite'),
};

