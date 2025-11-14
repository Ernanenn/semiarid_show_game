import { useState, useEffect } from 'react';
import { ScoreService } from '../services/scoreService';

/**
 * Hook customizado para gerenciar pontuações
 */
export function useScores(limit = 10) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const loadScores = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ScoreService.getTopScores(limit);
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

