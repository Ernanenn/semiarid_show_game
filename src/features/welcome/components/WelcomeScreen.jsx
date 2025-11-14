import React, { useState } from 'react';
import styled from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { Button } from '../../../shared/components/ui/Button';
import { Field, Input, Label } from '../../../shared/components/ui/Input';
import { HighScoresTable } from '../../scores/components/HighScoresTable';

const Container = styled(Panel)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 90%;
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.2;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.3rem, 4vw, 1.8rem);
  }
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: 0.9rem;
  text-align: center;
  max-width: 28rem;
  line-height: 1.4;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
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

export function WelcomeScreen({ onStartGame }) {
  const [playerData, setPlayerData] = useState({
    name: '',
    location: '',
    locationState: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerData.name.trim()) {
      alert('Por favor, digite seu nome antes de começar!');
      return;
    }
    onStartGame(playerData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Title>Show do Semiárido</Title>
      <Subtitle>
        Prepare-se para um mergulho nas tradições, histórias e curiosidades do Semiárido brasileiro.
      </Subtitle>

      <Form onSubmit={handleSubmit}>
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

        <Button type="submit" $variant="primary" $size="md" $block>
          Iniciar Quiz
        </Button>
      </Form>

      <HighScoresTable limit={5} />
    </Container>
  );
}

