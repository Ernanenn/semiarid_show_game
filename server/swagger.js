import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Show do Semiárido API',
      version: '1.0.0',
      description: 'API REST para o jogo de quiz Show do Semiárido',
      contact: {
        name: 'Ernane Nogueira Nunes',
        email: 'ernanenn@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desenvolvimento',
      },
      {
        url: process.env.RENDER_EXTERNAL_URL || 'https://semiarid-show-game.onrender.com',
        description: 'Servidor de produção',
      },
    ],
    components: {
      schemas: {
        Score: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do score',
            },
            name: {
              type: 'string',
              description: 'Nome do jogador',
            },
            location: {
              type: 'string',
              description: 'Cidade do jogador',
            },
            state: {
              type: 'string',
              description: 'Estado do jogador',
            },
            score: {
              type: 'integer',
              description: 'Pontuação em porcentagem',
            },
            correctAnswers: {
              type: 'integer',
              description: 'Número de respostas corretas',
            },
            totalQuestions: {
              type: 'integer',
              description: 'Total de perguntas respondidas',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do score',
            },
          },
        },
        SaveScoreRequest: {
          type: 'object',
          required: ['name', 'scorePercentage'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do jogador',
            },
            location: {
              type: 'string',
              description: 'Cidade do jogador',
            },
            state: {
              type: 'string',
              description: 'Estado do jogador',
            },
            scorePercentage: {
              type: 'number',
              description: 'Pontuação em porcentagem',
            },
            correctAnswers: {
              type: 'integer',
              description: 'Número de respostas corretas',
            },
            totalQuestions: {
              type: 'integer',
              description: 'Total de perguntas respondidas',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
  },
  apis: ['./server/routes/*.js'], // Caminho para os arquivos com anotações
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return swaggerSpec;
}

