// Tipos compartilhados do projeto

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  id?: string;
  text: string;
  correct: boolean;
}

export interface PlayerInfo {
  name: string;
  location: string;
  locationState: string;
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  answerId: string;
  answerText: string;
  correct: boolean;
}

export interface GameSummary {
  scorePercentage: number;
  correctCount: number;
  totalQuestions: number;
  answers?: AnswerRecord[];
}

export interface Score {
  id: number;
  name: string;
  location: string;
  state: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  createdAt: string;
}

export interface ScoreFilters {
  state?: string | null;
  location?: string | null;
  days?: number | null;
}

export interface SaveScoreData {
  name: string;
  location: string;
  state: string;
  scorePercentage: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface ApiResponse<T> {
  scores?: T[];
  states?: string[];
  locations?: string[];
  [key: string]: unknown;
}

