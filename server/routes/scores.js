import express from 'express';
import { ScoresRepository } from '../repositories/scoresRepository.js';

export function createScoresRouter(database) {
  const router = express.Router();
  const scoresRepo = new ScoresRepository(database);

  /**
   * @swagger
   * /api/scores:
   *   post:
   *     summary: Registra uma nova pontuação
   *     tags: [Scores]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SaveScoreRequest'
   *     responses:
   *       201:
   *         description: Score registrado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 playerId:
   *                   type: integer
   *                 scorePercentage:
   *                   type: integer
   *                 message:
   *                   type: string
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post('/', async (req, res) => {
    try {
      const { name, location, state, scorePercentage, correctAnswers, totalQuestions } = req.body;

      if (!name || typeof scorePercentage !== 'number') {
        return res.status(400).json({
          error: 'Campos obrigatórios: name, scorePercentage'
        });
      }

      const playerId = await scoresRepo.createPlayer({ name, location, state });
      const scoreId = await scoresRepo.createScore({
        playerId,
        scorePercentage: Math.round(scorePercentage),
        correctAnswers: correctAnswers || 0,
        totalQuestions: totalQuestions || 0
      });

      res.status(201).json({
        id: scoreId,
        playerId,
        scorePercentage: Math.round(scorePercentage),
        message: 'Score registrado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar score:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  /**
   * @swagger
   * /api/scores/top:
   *   get:
   *     summary: Busca as melhores pontuações
   *     tags: [Scores]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Número máximo de resultados (máximo 100)
   *       - in: query
   *         name: state
   *         schema:
   *           type: string
   *         description: Filtrar por estado
   *       - in: query
   *         name: location
   *         schema:
   *           type: string
   *         description: Filtrar por cidade
   *       - in: query
   *         name: days
   *         schema:
   *           type: integer
   *         description: Filtrar por últimos X dias (7, 30 ou 90)
   *     responses:
   *       200:
   *         description: Lista de pontuações
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 scores:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Score'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/top', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        state: req.query.state,
        location: req.query.location,
        days: req.query.days,
      };
      
      const topScores = await scoresRepo.getTopScores(Math.min(limit, 100), filters);
      
      res.json({
        scores: topScores.map(score => ({
          id: score.id,
          name: score.name,
          location: score.location || '-',
          state: score.state || '-',
          score: score.score_percentage,
          correctAnswers: score.correct_answers,
          totalQuestions: score.total_questions,
          createdAt: score.created_at
        }))
      });
    } catch (error) {
      console.error('Erro ao buscar top scores:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  /**
   * @swagger
   * /api/scores/filters/states:
   *   get:
   *     summary: Busca lista de estados disponíveis
   *     tags: [Filters]
   *     responses:
   *       200:
   *         description: Lista de estados
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 states:
   *                   type: array
   *                   items:
   *                     type: string
   *       500:
   *         description: Erro interno do servidor
   */
  router.get('/filters/states', async (req, res) => {
    try {
      const states = await scoresRepo.getStates();
      res.json({ states: states.map(s => s.state) });
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  /**
   * @swagger
   * /api/scores/filters/locations:
   *   get:
   *     summary: Busca lista de cidades disponíveis
   *     tags: [Filters]
   *     parameters:
   *       - in: query
   *         name: state
   *         schema:
   *           type: string
   *         description: Filtrar cidades por estado (opcional)
   *     responses:
   *       200:
   *         description: Lista de cidades
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 locations:
   *                   type: array
   *                   items:
   *                     type: string
   *       500:
   *         description: Erro interno do servidor
   */
  router.get('/filters/locations', async (req, res) => {
    try {
      const locations = await scoresRepo.getLocations(req.query.state);
      res.json({ locations: locations.map(l => l.location) });
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  return router;
}

