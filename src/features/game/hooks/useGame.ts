import { useState, useCallback } from 'react';
import { GAME_STATES, type GameState } from '../../../shared/constants';
import type { PlayerInfo, GameSummary } from '../../../shared/types';

/**
 * Hook customizado para gerenciar o estado do jogo
 */
export function useGame() {
  const [gameState, setGameState] = useState<GameState>(GAME_STATES.WELCOME);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    name: '',
    location: '',
    locationState: '',
  });
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);

  const startGame = useCallback((playerData: PlayerInfo) => {
    setPlayerInfo(playerData);
    setGameSummary(null);
    setGameState(GAME_STATES.PLAYING);
  }, []);

  const endGame = useCallback((summary: GameSummary) => {
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
