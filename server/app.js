import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { createScoresRouter } from './routes/scores.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export function createApp({ database }) {
  const app = express();

  app.locals.database = database;

  const allowedOrigins = env.clientOrigin
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json({ limit: '1mb' }));

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', database: true, environment: env.nodeEnv });
  });

  app.use('/api/scores', createScoresRouter(database));

  // Serve static files from the React app build
  const distPath = path.resolve(projectRoot, 'dist');
  app.use(express.static(distPath));

  // Serve React app for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });

  return app;
}

