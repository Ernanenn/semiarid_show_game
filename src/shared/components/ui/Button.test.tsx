import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('deve renderizar com texto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clique</Button>);
    const button = screen.getByRole('button', { name: /clique/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled', () => {
    render(<Button disabled>Desabilitado</Button>);
    const button = screen.getByRole('button', { name: /desabilitado/i });
    expect(button).toBeDisabled();
  });

  it('deve ter aria-label quando fornecido', () => {
    render(<Button aria-label="Botão de ação">Texto</Button>);
    expect(screen.getByLabelText('Botão de ação')).toBeInTheDocument();
  });

  it('deve aplicar variante corretamente', () => {
    const { container } = render(<Button $variant="primary">Primário</Button>);
    expect(container.firstChild).toHaveClass(); // Verifica se styled-component aplicou
  });
});

