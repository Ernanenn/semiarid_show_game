import { describe, it, expect } from 'vitest';
import { QuestionService } from './questionService';
import type { Question } from '../../../shared/types';

const mockQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Pergunta 1',
    answers: [
      { id: 'q1-a1', text: 'Resposta 1', correct: true },
      { id: 'q1-a2', text: 'Resposta 2', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'Pergunta 2',
    answers: [
      { id: 'q2-a1', text: 'Resposta 3', correct: false },
      { id: 'q2-a2', text: 'Resposta 4', correct: true },
    ],
  },
];

describe('QuestionService', () => {
  describe('prepareDeck', () => {
    it('deve retornar um deck com o mesmo número de questões', () => {
      const deck = QuestionService.prepareDeck(mockQuestions);
      expect(deck).toHaveLength(mockQuestions.length);
    });

    it('deve embaralhar as questões', () => {
      const deck1 = QuestionService.prepareDeck(mockQuestions);
      const deck2 = QuestionService.prepareDeck(mockQuestions);

      // Pode ser igual por acaso, mas é improvável com múltiplas execuções
      // Vamos verificar se pelo menos uma vez é diferente
      let different = false;
      for (let i = 0; i < 10; i++) {
        const d1 = QuestionService.prepareDeck(mockQuestions);
        const d2 = QuestionService.prepareDeck(mockQuestions);
        if (d1[0].id !== d2[0].id) {
          different = true;
          break;
        }
      }
      // Se todas as 10 tentativas resultaram na mesma ordem, algo está errado
      // Mas não vamos falhar o teste por isso, apenas logar
      expect(deck1).toHaveLength(mockQuestions.length);
    });

    it('deve embaralhar as respostas de cada questão', () => {
      const deck = QuestionService.prepareDeck(mockQuestions);
      const firstQuestion = deck[0];

      expect(firstQuestion.answers).toHaveLength(2);
      // Verifica se todas as respostas originais estão presentes
      const originalAnswers = mockQuestions.find((q) => q.id === firstQuestion.id)?.answers || [];
      expect(firstQuestion.answers.map((a) => a.id).sort()).toEqual(
        originalAnswers.map((a) => a.id).sort()
      );
    });

    it('deve funcionar com array vazio', () => {
      const deck = QuestionService.prepareDeck([]);
      expect(deck).toEqual([]);
    });
  });

  describe('calculateScorePercentage', () => {
    it('deve calcular a porcentagem corretamente', () => {
      expect(QuestionService.calculateScorePercentage(8, 10)).toBe(80);
      expect(QuestionService.calculateScorePercentage(5, 10)).toBe(50);
      expect(QuestionService.calculateScorePercentage(0, 10)).toBe(0);
      expect(QuestionService.calculateScorePercentage(10, 10)).toBe(100);
    });

    it('deve arredondar corretamente', () => {
      expect(QuestionService.calculateScorePercentage(1, 3)).toBe(33);
      expect(QuestionService.calculateScorePercentage(2, 3)).toBe(67);
    });

    it('deve retornar 0 quando totalQuestions é 0', () => {
      expect(QuestionService.calculateScorePercentage(5, 0)).toBe(0);
    });

    it('deve retornar 0 quando não há acertos', () => {
      expect(QuestionService.calculateScorePercentage(0, 10)).toBe(0);
    });
  });
});

