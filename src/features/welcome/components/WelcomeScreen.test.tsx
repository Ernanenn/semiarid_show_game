import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { WelcomeScreen } from './WelcomeScreen';
import { theme } from '../../../styles/theme';

describe('WelcomeScreen', () => {
  const mockOnStartGame = vi.fn();

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('deve renderizar o título e subtítulo', () => {
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText('Show do Semiárido')).toBeInTheDocument();
    expect(
      screen.getByText(/Prepare-se para um mergulho nas tradições/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar os campos do formulário', () => {
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar quiz/i })).toBeInTheDocument();
  });

  it('deve ter aria-labels apropriados', () => {
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    const form = screen.getByRole('form', { name: /formulário de início do jogo/i });
    expect(form).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /iniciar quiz/i });
    expect(button).toHaveAttribute('aria-label', 'Iniciar quiz');
  });

  it('deve permitir preencher o formulário', async () => {
    const user = userEvent.setup();
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    const nameInput = screen.getByLabelText(/nome/i);
    const cityInput = screen.getByLabelText(/cidade/i);
    const stateInput = screen.getByLabelText(/estado/i);

    await user.type(nameInput, 'João');
    await user.type(cityInput, 'Recife');
    await user.type(stateInput, 'PE');

    expect(nameInput).toHaveValue('João');
    expect(cityInput).toHaveValue('Recife');
    expect(stateInput).toHaveValue('PE');
  });

  it('deve chamar onStartGame ao submeter o formulário com nome válido', async () => {
    const user = userEvent.setup();
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    const nameInput = screen.getByLabelText(/nome/i);
    await user.type(nameInput, 'João');

    const submitButton = screen.getByRole('button', { name: /iniciar quiz/i });
    await user.click(submitButton);

    expect(mockOnStartGame).toHaveBeenCalledWith({
      name: 'João',
      location: '',
      locationState: '',
    });
  });

  it('não deve submeter se o nome estiver vazio', async () => {
    const user = userEvent.setup();
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    const submitButton = screen.getByRole('button', { name: /iniciar quiz/i });
    await user.click(submitButton);

    expect(mockOnStartGame).not.toHaveBeenCalled();
  });

  it('deve renderizar a tabela de pontuações', () => {
    renderWithTheme(<WelcomeScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText(/top.*pontuações/i)).toBeInTheDocument();
  });
});

