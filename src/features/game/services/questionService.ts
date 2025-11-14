import { shuffleArray } from '../../../shared/utils';
import type { Question } from '../../../shared/types';

/**
 * Service para gerenciar questões do quiz
 */
export class QuestionService {
  /**
   * Prepara um deck de questões embaralhadas
   * @param questions - Array de questões
   * @returns Deck de questões com respostas embaralhadas
   */
  static prepareDeck(questions: Question[]): Question[] {
    return shuffleArray(questions).map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
  }

  /**
   * Calcula a porcentagem de acertos
   * @param correctCount - Número de acertos
   * @param totalQuestions - Total de questões
   * @returns Porcentagem arredondada
   */
  static calculateScorePercentage(correctCount: number, totalQuestions: number): number {
    if (totalQuestions === 0) return 0;
    return Math.round((correctCount / totalQuestions) * 100);
  }
}

