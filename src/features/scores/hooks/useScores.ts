import { useState, useEffect } from 'react';
import { ScoreService } from '../services/scoreService';
import type { Score, ScoreFilters } from '../../../shared/types';

interface UseScoresReturn {
  scores: Score[];
  loading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

interface UseScoreFiltersReturn {
  states: string[];
  locations: string[];
  loading: boolean;
  loadStates: () => Promise<void>;
  loadLocations: (state?: string | null) => Promise<void>;
}

/**
 * Hook customizado para gerenciar pontuações
 */
export function useScores(limit = 10, filters: ScoreFilters = {}): UseScoresReturn {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, filters.state, filters.location, filters.days]);

  const loadScores = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await ScoreService.getTopScores(limit, filters);
      setScores(response.scores || []);
    } catch (err) {
      console.error('Erro ao carregar scores:', err);
      setError(null); // Não mostrar erro, apenas não exibir ranking
      setScores([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    scores,
    loading,
    error,
    reload: loadScores,
  };
}

/**
 * Hook para buscar estados e cidades disponíveis
 */
export function useScoreFilters(): UseScoreFiltersReturn {
  const [states, setStates] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadStates = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await ScoreService.getStates();
      setStates(response.states || []);
    } catch (err) {
      console.error('Erro ao carregar estados:', err);
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const loadLocations = async (state: string | null = null): Promise<void> => {
    try {
      setLoading(true);
      const response = await ScoreService.getLocations(state);
      setLocations(response.locations || []);
    } catch (err) {
      console.error('Erro ao carregar cidades:', err);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    states,
    locations,
    loading,
    loadStates,
    loadLocations,
  };
}

