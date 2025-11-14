import { createServer } from 'http';
import { env } from './config/env.js';
import { createApp } from './app.js';
import { getDatabase } from './db/postgres.js';
import { closeDatabase } from './db/postgres.js';

async function bootstrap() {
  try {
    const database = await getDatabase();
    const app = createApp({ database });
    const server = createServer(app);

    server.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API disponível em http://localhost:${env.port}`);
      // eslint-disable-next-line no-console
      console.log('Database: PostgreSQL');
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(async () => {
        console.log('HTTP server closed');
        await closeDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao iniciar o servidor', error);
    process.exit(1);
  }
}

bootstrap();

