import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { QuizScreen } from './QuizScreen';
import { theme } from '../../../styles/theme';
import type { Question } from '../../../shared/types';

// Mock dos utilitários de áudio e voz
vi.mock('../../../shared/utils', () => ({
  stopAllSounds: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('../../hooks/useVoiceReading', () => ({
  useVoiceReading: vi.fn(),
}));

const mockQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Qual é a técnica de convivência com o Semiárido?',
    answers: [
      { id: 'q1-a1', text: 'Cisternas', correct: true },
      { id: 'q1-a2', text: 'Irrigação', correct: false },
      { id: 'q1-a3', text: 'Captação', correct: false },
      { id: 'q1-a4', text: 'Aproveitamento', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'Qual é o principal bioma do Semiárido?',
    answers: [
      { id: 'q2-a1', text: 'Mata Atlântica', correct: false },
      { id: 'q2-a2', text: 'Caatinga', correct: true },
      { id: 'q2-a3', text: 'Cerrado', correct: false },
      { id: 'q2-a4', text: 'Pantanal', correct: false },
    ],
  },
];

describe('QuizScreen', () => {
  const mockOnGameOver = vi.fn();

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a primeira pergunta', () => {
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    expect(screen.getByText(/pergunta 1 de/i)).toBeInTheDocument();
  });

  it('deve renderizar todas as alternativas', () => {
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    mockQuestions[0].answers.forEach((answer) => {
      expect(screen.getByText(new RegExp(answer.text, 'i'))).toBeInTheDocument();
    });
  });

  it('deve ter aria-labels nas alternativas', () => {
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    const answerButtons = screen.getAllByRole('button');
    const answerButtonsWithAria = answerButtons.filter((btn) =>
      btn.getAttribute('aria-label')?.startsWith('Alternativa')
    );

    expect(answerButtonsWithAria.length).toBeGreaterThan(0);
  });

  it('deve permitir clicar em uma alternativa', async () => {
    const user = userEvent.setup();
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    const correctAnswer = screen.getByText(mockQuestions[0].answers[0].text);
    await user.click(correctAnswer);

    await waitFor(() => {
      expect(correctAnswer).toBeDisabled();
    });
  });

  it('deve desabilitar todas as alternativas após selecionar uma', async () => {
    const user = userEvent.setup();
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    const firstAnswer = screen.getByText(mockQuestions[0].answers[0].text);
    await user.click(firstAnswer);

    await waitFor(() => {
      const allAnswers = screen.getAllByRole('button');
      const answerButtons = allAnswers.filter((btn) =>
        btn.getAttribute('aria-label')?.startsWith('Alternativa')
      );
      answerButtons.forEach((btn) => {
        expect(btn).toBeDisabled();
      });
    });
  });

  it('deve mostrar botão de próxima pergunta após acertar', async () => {
    const user = userEvent.setup();
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    const correctAnswer = screen.getByText(mockQuestions[0].answers[0].text);
    await user.click(correctAnswer);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /próxima pergunta/i })).toBeInTheDocument();
    });
  });

  it('deve ter aria-label no botão de próxima pergunta', async () => {
    const user = userEvent.setup();
    renderWithTheme(<QuizScreen questions={mockQuestions} onGameOver={mockOnGameOver} />);

    const correctAnswer = screen.getByText(mockQuestions[0].answers[0].text);
    await user.click(correctAnswer);

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /próxima pergunta/i });
      expect(nextButton).toHaveAttribute('aria-label', 'Próxima pergunta');
    });
  });
});

