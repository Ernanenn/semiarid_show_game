import { shuffleArray } from '../../../shared/utils';

/**
 * Service para gerenciar questões do quiz
 */
export class QuestionService {
  /**
   * Prepara um deck de questões embaralhadas
   * @param {Array} questions - Array de questões
   * @returns {Array} Deck de questões com respostas embaralhadas
   */
  static prepareDeck(questions) {
    return shuffleArray(questions).map(question => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
  }

  /**
   * Calcula a porcentagem de acertos
   * @param {number} correctCount - Número de acertos
   * @param {number} totalQuestions - Total de questões
   * @returns {number} Porcentagem arredondada
   */
  static calculateScorePercentage(correctCount, totalQuestions) {
    if (totalQuestions === 0) return 0;
    return Math.round((correctCount / totalQuestions) * 100);
  }
}

