import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { GameOverScreen } from './GameOverScreen';
import { theme } from '../../../styles/theme';
import type { GameSummary } from '../../../shared/types';

describe('GameOverScreen', () => {
  const mockOnRestart = vi.fn();

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('deve renderizar mensagem de carregamento quando não há summary', () => {
    renderWithTheme(
      <GameOverScreen playerName="João" gameSummary={null} onRestart={mockOnRestart} />
    );

    expect(screen.getByText(/fim do jogo/i)).toBeInTheDocument();
    expect(screen.getByText(/carregando resultados/i)).toBeInTheDocument();
  });

  it('deve renderizar os resultados quando há summary', () => {
    const summary: GameSummary = {
      correctCount: 8,
      totalQuestions: 10,
      scorePercentage: 80,
      answers: [],
    };

    renderWithTheme(
      <GameOverScreen playerName="João" gameSummary={summary} onRestart={mockOnRestart} />
    );

    expect(screen.getByText(/parabéns, joão/i)).toBeInTheDocument();
    expect(screen.getByText(/você acertou 8 de 10 perguntas/i)).toBeInTheDocument();
    expect(screen.getByText(/seu aproveitamento foi de 80%/i)).toBeInTheDocument();
  });

  it('deve ter aria-label no botão de jogar novamente', () => {
    const summary: GameSummary = {
      correctCount: 5,
      totalQuestions: 10,
      scorePercentage: 50,
      answers: [],
    };

    renderWithTheme(
      <GameOverScreen playerName="João" gameSummary={summary} onRestart={mockOnRestart} />
    );

    const restartButton = screen.getByRole('button', { name: /jogar novamente/i });
    expect(restartButton).toHaveAttribute('aria-label', 'Jogar novamente');
  });

  it('deve chamar onRestart ao clicar no botão', async () => {
    const user = userEvent.setup();
    const summary: GameSummary = {
      correctCount: 5,
      totalQuestions: 10,
      scorePercentage: 50,
      answers: [],
    };

    renderWithTheme(
      <GameOverScreen playerName="João" gameSummary={summary} onRestart={mockOnRestart} />
    );

    const restartButton = screen.getByRole('button', { name: /jogar novamente/i });
    await user.click(restartButton);

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });

  it('deve mostrar mensagem de feedback baseada na pontuação', () => {
    const summary: GameSummary = {
      correctCount: 8,
      totalQuestions: 10,
      scorePercentage: 80,
      answers: [],
    };

    renderWithTheme(
      <GameOverScreen playerName="João" gameSummary={summary} onRestart={mockOnRestart} />
    );

    expect(screen.getByText(/excelente/i)).toBeInTheDocument();
  });

  it('deve usar "jogador(a)" quando não há nome', () => {
    const summary: GameSummary = {
      correctCount: 5,
      totalQuestions: 10,
      scorePercentage: 50,
      answers: [],
    };

    renderWithTheme(
      <GameOverScreen playerName="" gameSummary={summary} onRestart={mockOnRestart} />
    );

    expect(screen.getByText(/parabéns, jogador\(a\)!/i)).toBeInTheDocument();
  });
});

