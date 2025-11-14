/**
 * Constantes compartilhadas da aplicação
 */

export const GAME_STATES = {
  WELCOME: 'welcome',
  PLAYING: 'playing',
  GAMEOVER: 'gameover',
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 75,
  GOOD: 50,
  FAIR: 25,
} as const;

export const FEEDBACK_MESSAGES = {
  EXCELLENT: 'Excelente! Você domina os conhecimentos do Semiárido.',
  GOOD: 'Muito bom! Continue explorando a cultura do Semiárido.',
  FAIR: 'Bom! Há sempre espaço para conhecer mais.',
  POOR: 'Pode melhorar! Que tal tentar novamente e descobrir novas curiosidades?',
} as const;

export const DEFAULT_HIGH_SCORES_LIMIT = 3;

export type GameState = typeof GAME_STATES[keyof typeof GAME_STATES];

