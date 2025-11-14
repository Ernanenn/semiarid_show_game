import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './client';
import type { ScoreFilters } from '../types';

// Mock do fetch global
global.fetch = vi.fn();

describe('ApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTopScores', () => {
    it('deve buscar scores sem filtros', async () => {
      const mockScores = {
        scores: [
          {
            id: 1,
            name: 'Teste',
            location: 'Cidade',
            state: 'Estado',
            score: 100,
            correctAnswers: 10,
            totalQuestions: 10,
            createdAt: '2024-01-01',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockScores,
      });

      const result = await apiClient.getTopScores(10);

      expect(result.scores).toHaveLength(1);
      expect(result.scores?.[0]?.name).toBe('Teste');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/scores/top?limit=10'),
        expect.any(Object)
      );
    });

    it('deve buscar scores com filtros', async () => {
      const mockScores = { scores: [] };
      const filters: ScoreFilters = {
        state: 'CE',
        location: 'Fortaleza',
        days: 30,
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockScores,
      });

      await apiClient.getTopScores(10, filters);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('state=CE'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('location=Fortaleza'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('days=30'),
        expect.any(Object)
      );
    });
  });

  describe('saveScore', () => {
    it('deve salvar um score com sucesso', async () => {
      const mockResponse = {
        id: 1,
        playerId: 1,
        scorePercentage: 100,
        message: 'Score registrado com sucesso',
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.saveScore({
        name: 'Teste',
        location: 'Cidade',
        state: 'Estado',
        scorePercentage: 100,
        correctAnswers: 10,
        totalQuestions: 10,
      });

      expect(result.id).toBe(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/scores'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('Teste'),
        })
      );
    });
  });

  describe('error handling', () => {
    it('deve lançar erro quando a requisição falha', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Erro interno' }),
      });

      await expect(apiClient.getTopScores(10)).rejects.toThrow();
    });

    it('deve tratar erros de rede', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Failed to fetch')
      );

      await expect(apiClient.getTopScores(10)).rejects.toThrow('Failed to fetch');
    });
  });
});

