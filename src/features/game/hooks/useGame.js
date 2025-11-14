import { useState, useCallback } from 'react';
import { QuestionService } from '../services/questionService';
import { GAME_STATES } from '../../../shared/constants';

/**
 * Hook customizado para gerenciar o estado do jogo
 */
export function useGame() {
  const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
  const [playerInfo, setPlayerInfo] = useState({
    name: '',
    location: '',
    locationState: '',
  });
  const [gameSummary, setGameSummary] = useState(null);

  const startGame = useCallback((playerData) => {
    setPlayerInfo(playerData);
    setGameSummary(null);
    setGameState(GAME_STATES.PLAYING);
  }, []);

  const endGame = useCallback((summary) => {
    setGameSummary(summary);
    setGameState(GAME_STATES.GAMEOVER);
  }, []);

  const restartGame = useCallback(() => {
    setGameState(GAME_STATES.WELCOME);
    setGameSummary(null);
    setPlayerInfo({
      name: '',
      location: '',
      locationState: '',
    });
  }, []);

  return {
    gameState,
    playerInfo,
    gameSummary,
    startGame,
    endGame,
    restartGame,
  };
}

