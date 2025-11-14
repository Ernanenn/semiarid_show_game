import React from 'react';
import styled from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { Button } from '../../../shared/components/ui/Button';
import { SCORE_THRESHOLDS, FEEDBACK_MESSAGES } from '../../../shared/constants';

const GameOverPanel = styled(Panel)`
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 520px;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 90%;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ResultTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const ResultHighlight = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
`;

const ResultFeedback = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: 1rem;
`;

function getFeedbackMessage(scorePercentage) {
  if (scorePercentage >= SCORE_THRESHOLDS.EXCELLENT) {
    return FEEDBACK_MESSAGES.EXCELLENT;
  }
  if (scorePercentage >= SCORE_THRESHOLDS.GOOD) {
    return FEEDBACK_MESSAGES.GOOD;
  }
  if (scorePercentage >= SCORE_THRESHOLDS.FAIR) {
    return FEEDBACK_MESSAGES.FAIR;
  }
  return FEEDBACK_MESSAGES.POOR;
}

export function GameOverScreen({ playerName, gameSummary, onRestart }) {
  if (!gameSummary) {
    return (
      <GameOverPanel>
        <ResultTitle>Fim do Jogo</ResultTitle>
        <ResultFeedback>Carregando resultados...</ResultFeedback>
        <Button type="button" onClick={onRestart} $variant="primary" $size="lg" $block>
          Voltar ao início
        </Button>
      </GameOverPanel>
    );
  }

  const { correctCount, totalQuestions, scorePercentage } = gameSummary;
  const feedbackMessage = getFeedbackMessage(scorePercentage);

  return (
    <GameOverPanel>
      <ResultTitle>Parabéns, {playerName || 'jogador(a)'}!</ResultTitle>
      <ResultHighlight>
        Você acertou {correctCount ?? 0} de {totalQuestions} perguntas.
      </ResultHighlight>
      <ResultHighlight>
        Seu aproveitamento foi de {scorePercentage ?? 0}%.
      </ResultHighlight>
      <ResultFeedback>{feedbackMessage}</ResultFeedback>
      <Button type="button" onClick={onRestart} $variant="primary" $size="lg" $block>
        Jogar novamente
      </Button>
    </GameOverPanel>
  );
}

