import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { createScoresRouter } from './routes/scores.js';

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

  // Health check endpoint
  app.get('/', (_req, res) => {
    res.json({ 
      message: 'Show do Semiárido API',
      status: 'online',
      version: '1.0.0'
    });
  });

  return app;
}

