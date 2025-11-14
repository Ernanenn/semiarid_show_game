import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useScores, useScoreFilters } from './useScores';
import { ScoreService } from '../services/scoreService';
import type { ScoreFilters } from '../../../shared/types';

// Mock do ScoreService
vi.mock('../services/scoreService', () => ({
  ScoreService: {
    getTopScores: vi.fn(),
    getStates: vi.fn(),
    getLocations: vi.fn(),
  },
}));

describe('useScores', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar scores inicialmente', async () => {
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

    vi.mocked(ScoreService.getTopScores).mockResolvedValueOnce(mockScores);

    const { result } = renderHook(() => useScores(10));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.scores).toHaveLength(1);
    expect(result.current.scores[0]?.name).toBe('Teste');
  });

  it('deve aplicar filtros corretamente', async () => {
    const filters: ScoreFilters = { state: 'CE', days: 30 };
    const mockScores = { scores: [] };

    vi.mocked(ScoreService.getTopScores).mockResolvedValueOnce(mockScores);

    renderHook(() => useScores(10, filters));

    await waitFor(() => {
      expect(ScoreService.getTopScores).toHaveBeenCalledWith(10, filters);
    });
  });

  it('deve tratar erros graciosamente', async () => {
    vi.mocked(ScoreService.getTopScores).mockRejectedValueOnce(
      new Error('Erro de rede')
    );

    const { result } = renderHook(() => useScores(10));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.scores).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});

describe('useScoreFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar estados', async () => {
    const mockStates = { states: ['CE', 'PE', 'BA'] };
    vi.mocked(ScoreService.getStates).mockResolvedValueOnce(mockStates);

    const { result } = renderHook(() => useScoreFilters());

    await result.current.loadStates();

    await waitFor(() => {
      expect(result.current.states).toEqual(['CE', 'PE', 'BA']);
    });
  });

  it('deve carregar cidades filtradas por estado', async () => {
    const mockLocations = { locations: ['Fortaleza', 'Ceará-Mirim'] };
    vi.mocked(ScoreService.getLocations).mockResolvedValueOnce(mockLocations);

    const { result } = renderHook(() => useScoreFilters());

    await result.current.loadLocations('CE');

    await waitFor(() => {
      expect(ScoreService.getLocations).toHaveBeenCalledWith('CE');
      expect(result.current.locations).toEqual(['Fortaleza', 'Ceará-Mirim']);
    });
  });
});

