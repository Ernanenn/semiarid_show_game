import { apiClient } from '../../../shared/api/client';
import type { SaveScoreData, ScoreFilters, ApiResponse, Score } from '../../../shared/types';

/**
 * Service para gerenciar pontuações
 */
export class ScoreService {
  /**
   * Salva uma pontuação no backend
   */
  static async saveScore(scoreData: SaveScoreData): Promise<{ id: number; playerId: number; scorePercentage: number; message: string }> {
    try {
      return await apiClient.saveScore(scoreData);
    } catch (error) {
      console.error('Erro ao salvar score:', error);
      throw error;
    }
  }

  /**
   * Busca as melhores pontuações
   */
  static async getTopScores(limit = 10, filters: ScoreFilters = {}): Promise<ApiResponse<Score>> {
    try {
      return await apiClient.getTopScores(limit, filters);
    } catch (error) {
      console.error('Erro ao buscar scores:', error);
      throw error;
    }
  }

  /**
   * Busca lista de estados disponíveis
   */
  static async getStates(): Promise<ApiResponse<string>> {
    try {
      return await apiClient.getStates();
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  }

  /**
   * Busca lista de cidades disponíveis
   */
  static async getLocations(state: string | null = null): Promise<ApiResponse<string>> {
    try {
      return await apiClient.getLocations(state);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  }
}

