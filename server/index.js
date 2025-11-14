import { createServer } from 'http';
import { env } from './config/env.js';
import { createApp } from './app.js';
import { getDatabase } from './db/sqlite.js';

async function bootstrap() {
  try {
    const database = await getDatabase();
    const app = createApp({ database });
    const server = createServer(app);

    server.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API disponível em http://localhost:${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao iniciar o servidor', error);
    process.exit(1);
  }
}

bootstrap();

