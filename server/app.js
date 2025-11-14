import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { createScoresRouter } from './routes/scores.js';
import { setupSwagger } from './swagger.js';

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

  // Swagger Documentation
  if (env.nodeEnv !== 'production') {
    setupSwagger(app);
  }

  // API Routes
  /**
   * @swagger
   * /api/health:
   *   get:
   *     summary: Health check da API
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API está funcionando
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 database:
   *                   type: boolean
   *                 environment:
   *                   type: string
   */
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', database: true, environment: env.nodeEnv });
  });

  app.use('/api/scores', createScoresRouter(database));

  // Health check endpoint
  app.get('/', (_req, res) => {
    res.json({ 
      message: 'Show do Semiárido API',
      status: 'online',
      version: '1.0.0',
      docs: env.nodeEnv !== 'production' ? '/api-docs' : undefined
    });
  });

  return app;
}

