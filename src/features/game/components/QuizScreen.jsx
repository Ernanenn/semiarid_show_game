import React from 'react';
import styled, { css } from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { Button } from '../../../shared/components/ui/Button';
import { useQuiz } from '../hooks/useQuiz';
import { useVoiceReading } from '../hooks/useVoiceReading';
import { stopAllSounds, stop } from '../../../shared/utils';

const QuizContainer = styled(Panel)`
  max-width: 900px;
  gap: ${({ theme }) => theme.spacing.lg};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 95%;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const Question = styled.h2`
  font-size: ${({ theme }) => theme.typography.heading};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const ProgressText = styled.span`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.accent};
`;

const AnswersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  /* Desktop: >= 1024px - mantém 2 colunas com gap maior */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  /* Mobile: < 768px - 1 coluna */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const AnswerButton = styled(Button).attrs({
  $variant: 'subtle',
  $size: 'md',
})`
  justify-content: flex-start;
  text-align: left;
  font-weight: 600;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border};
  min-height: 0;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
    font-size: 0.95rem;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.9rem;
    min-height: 2.5rem;
  }

  ${({ $status, theme }) =>
    $status === 'correct' &&
    css`
      background: linear-gradient(
        135deg,
        ${theme.colors.success},
        ${theme.colors.successHighlight}
      );
      border-color: rgba(63, 125, 43, 0.5);
      box-shadow: 0 0 20px rgba(63, 125, 43, 0.35);
    `}

  ${({ $status, theme }) =>
    $status === 'incorrect' &&
    css`
      background: linear-gradient(
        135deg,
        ${theme.colors.danger},
        ${theme.colors.dangerHighlight}
      );
      border-color: rgba(198, 40, 40, 0.5);
      box-shadow: 0 0 20px rgba(198, 40, 40, 0.35);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const NextButton = styled(Button).attrs({
  $variant: 'success',
  $size: 'lg',
  $block: true,
})`
  max-width: 280px;
  margin: 0 auto;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 240px;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    font-size: 1rem;
  }
`;

export function QuizScreen({ questions, onGameOver }) {
  const {
    currentQuestion,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    handleAnswerClick,
    handleNextQuestion: handleNext,
  } = useQuiz(questions, onGameOver);

  // Gerencia a leitura por voz
  useVoiceReading(currentQuestion);

  // Handler para próxima pergunta com limpeza de sons
  const handleNextQuestion = () => {
    stop();
    stopAllSounds();
    handleNext();
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuizContainer>
      <Header>
        <Question>{currentQuestion.question}</Question>
        <ProgressText>
          Pergunta {questionNumber} de {totalQuestions}
        </ProgressText>
      </Header>

      <AnswersGrid>
        {currentQuestion.answers.map((answer, index) => {
          const status =
            selectedAnswer && answer.correct
              ? 'correct'
              : selectedAnswer === answer
                ? 'incorrect'
                : 'neutral';
          
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <AnswerButton
              key={`${currentQuestion.id}-${answer.id}`}
              type="button"
              onClick={() => !selectedAnswer && handleAnswerClick(answer)}
              disabled={selectedAnswer !== null}
              $status={status}
            >
              <strong>{letter}:</strong> {answer.text}
            </AnswerButton>
          );
        })}
      </AnswersGrid>

      {selectedAnswer?.correct && (
        <NextButton type="button" onClick={handleNextQuestion}>
          {questionNumber >= totalQuestions ? 'Finalizar' : 'Próxima pergunta'}
        </NextButton>
      )}
    </QuizContainer>
  );
}

