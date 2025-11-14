/**
 * Tipos e interfaces compartilhadas
 */

/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {string} [location]
 * @property {string} [locationState]
 */

/**
 * @typedef {Object} Answer
 * @property {string} id
 * @property {string} text
 * @property {boolean} correct
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} question
 * @property {Answer[]} answers
 */

/**
 * @typedef {Object} GameSummary
 * @property {Player} player
 * @property {number} correctCount
 * @property {number} totalQuestions
 * @property {number} scorePercentage
 * @property {Array} answers
 */

/**
 * @typedef {Object} Score
 * @property {number} id
 * @property {string} name
 * @property {string} [location]
 * @property {string} [state]
 * @property {number} score_percentage
 * @property {number} correct_answers
 * @property {number} total_questions
 * @property {string} created_at
 */

/**
 * @typedef {'welcome' | 'playing' | 'gameover'} GameState
 */

export {};

