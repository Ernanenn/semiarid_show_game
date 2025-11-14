import React, { useState } from 'react';
import styled from 'styled-components';
import { Panel } from './ui/Panel.jsx';
import { Button } from './ui/Button.jsx';
import { Field, Input, Label } from './ui/Input.jsx';
import { HighScoresTable } from './HighScoresTable';

const Container = styled(Panel)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 90%;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.title};
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: 1rem;
  text-align: center;
  max-width: 28rem;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

function WelcomeScreen({ onStartGame }) {
  const [playerData, setPlayerData] = useState({
    name: '',
    location: '',
    locationState: ''
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
      [name]: value
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

        <Button type="submit" $variant="primary" $size="lg" $block>
          Iniciar Quiz
        </Button>
      </Form>

      <HighScoresTable limit={5} />
    </Container>
  );
}

export default WelcomeScreen;