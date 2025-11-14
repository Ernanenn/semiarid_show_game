import { apiClient } from '../../../shared/api/client';

/**
 * Service para gerenciar pontuações
 */
export class ScoreService {
  /**
   * Salva uma pontuação no backend
   * @param {Object} scoreData - Dados da pontuação
   * @param {string} scoreData.name - Nome do jogador
   * @param {string} [scoreData.location] - Cidade do jogador
   * @param {string} [scoreData.state] - Estado do jogador
   * @param {number} scoreData.scorePercentage - Porcentagem de acertos
   * @param {number} scoreData.correctAnswers - Número de acertos
   * @param {number} scoreData.totalQuestions - Total de questões
   * @returns {Promise} Promise com a resposta da API
   */
  static async saveScore(scoreData) {
    try {
      return await apiClient.saveScore(scoreData);
    } catch (error) {
      console.error('Erro ao salvar score:', error);
      throw error;
    }
  }

  /**
   * Busca as melhores pontuações
   * @param {number} limit - Número máximo de pontuações a retornar
   * @returns {Promise<Object>} Promise com as pontuações
   */
  static async getTopScores(limit = 10) {
    try {
      return await apiClient.getTopScores(limit);
    } catch (error) {
      console.error('Erro ao buscar scores:', error);
      throw error;
    }
  }
}

