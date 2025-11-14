import { useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { Button } from '../../../shared/components/ui/Button';
import { Field, Input, Label } from '../../../shared/components/ui/Input';
import { HighScoresTable } from '../../scores/components/HighScoresTable';
import type { PlayerInfo } from '../../../shared/types';

const Container = styled(Panel)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 100%;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
    padding-top: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: clamp(1.7rem, 3.5vw, 2.5rem);
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.2;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.5rem, 4.5vw, 2rem);
  }
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  text-align: center;
  max-width: 32rem;
  line-height: 1.5;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(0.9rem, 2vw, 1rem);
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 88%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 90%;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const LocationFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

interface WelcomeScreenProps {
  onStartGame: (playerInfo: PlayerInfo) => void;
}

export function WelcomeScreen({ onStartGame }: WelcomeScreenProps): JSX.Element {
  const [playerData, setPlayerData] = useState<PlayerInfo>({
    name: '',
    location: '',
    locationState: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!playerData.name.trim()) {
      alert('Por favor, digite seu nome antes de começar!');
      return;
    }
    onStartGame(playerData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Title>Show do Semiárido</Title>
      <Subtitle>
        Prepare-se para um mergulho nas tradições, histórias e curiosidades do Semiárido
        brasileiro.
      </Subtitle>

      <Form onSubmit={handleSubmit} role="form" aria-label="Formulário de início do jogo">
        <Field>
          <Label htmlFor="player-name">Nome</Label>
          <Input
            id="player-name"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={playerData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-required="true"
          />
        </Field>

        <LocationFields>
          <Field>
            <Label htmlFor="player-location">Cidade (opcional)</Label>
            <Input
              id="player-location"
              type="text"
              name="location"
              placeholder="Digite sua cidade"
              value={playerData.location}
              onChange={handleChange}
              autoComplete="address-level2"
            />
          </Field>

          <Field>
            <Label htmlFor="player-state">Estado (opcional)</Label>
            <Input
              id="player-state"
              type="text"
              name="locationState"
              placeholder="Digite seu estado"
              value={playerData.locationState}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </Field>
        </LocationFields>

        <Button type="submit" $variant="primary" $size="md" $block aria-label="Iniciar quiz">
          Iniciar Quiz
        </Button>
      </Form>

      <HighScoresTable limit={3} />
    </Container>
  );
}
