import express from 'express';
import { ScoresRepository } from '../repositories/scoresRepository.js';

export function createScoresRouter(database) {
  const router = express.Router();
  const scoresRepo = new ScoresRepository(database);

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

  router.get('/top', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const topScores = await scoresRepo.getTopScores(Math.min(limit, 100));
      
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

  return router;
}

