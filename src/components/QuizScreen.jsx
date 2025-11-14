import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Panel } from './ui/Panel.jsx';
import { Button } from './ui/Button.jsx';
import { shuffleArray } from '../utils/shuffle.js';
import { playCorrectSound, playIncorrectSound, stopAllSounds } from '../utils/audios.js';
import { speak, stop, stopAndWait } from '../utils/responsiveVoice.js';

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

  /* Tablet: 768px - 1023px - mantém 2 colunas (padrão já aplicado) */

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

function QuizScreen({ questions, playerInfo, onGameOver }) {
    const [questionsDeck, setQuestionsDeck] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [answerHistory, setAnswerHistory] = useState([]);

    useEffect(() => {
        const deck = shuffleArray(questions).map(question => ({
            ...question,
            answers: shuffleArray(question.answers),
        }));

        setQuestionsDeck(deck);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setCorrectAnswers(0);
        setAnswerHistory([]);
    }, [questions]);

    const currentQuestion = questionsDeck[currentQuestionIndex];

    // Ler pergunta e alternativas quando a pergunta mudar
    useEffect(() => {
        if (!currentQuestion) return;

        // Para qualquer leitura anterior
        stop();

        // Aguarda um pequeno delay para garantir que o DOM foi atualizado
        const timer = setTimeout(() => {
            // Lê a pergunta
            const questionText = `${currentQuestion.question}`;
            
            // Função para ler alternativas sequencialmente
            const readAlternatives = (index = 0) => {
                if (index >= currentQuestion.answers.length) return;
                
                const answer = currentQuestion.answers[index];
                const letter = String.fromCharCode(65 + index); // A, B, C, D
                const alternativeText = `${letter}: ${answer.text}`;
                
                speak(alternativeText, {
                    rate: 1.0, // Velocidade normal
                    onend: () => {
                        // Pequeno delay antes de ler a próxima alternativa
                        setTimeout(() => {
                            readAlternatives(index + 1);
                        }, 200);
                    },
                });
            };

            speak(questionText, {
                onend: () => {
                    // Pequeno delay antes de começar a ler as alternativas
                    setTimeout(() => {
                        readAlternatives(0);
                    }, 300);
                },
            });
        }, 300);

        return () => {
            clearTimeout(timer);
            stop();
        };
    }, [currentQuestion]);

    const finishGame = ({ totalCorrect = correctAnswers, history = answerHistory } = {}) => {
        const totalQuestions = questionsDeck.length || questions.length;
        const scorePercentage =
            totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        onGameOver({
            player: playerInfo,
            correctCount: totalCorrect,
            totalQuestions,
            scorePercentage,
            answers: history,
        });
    };

    const handleAnswerClick = async (answer) => {
        if (!currentQuestion || selectedAnswer) return;

        // Para a leitura imediatamente quando clicar em uma resposta
        stop();

        const answerRecord = {
            questionId: currentQuestion.id,
            questionText: currentQuestion.question,
            answerId: answer.id,
            answerText: answer.text,
            correct: Boolean(answer.correct),
        };

        const updatedHistory = [...answerHistory, answerRecord];
        setAnswerHistory(updatedHistory);
        setSelectedAnswer(answer);

        if (answer.correct) {
            // Aguarda a leitura parar completamente antes de tocar as palmas
            await stopAndWait();
            
            const updatedCorrectAnswers = correctAnswers + 1;
            setCorrectAnswers(updatedCorrectAnswers);
            playCorrectSound();
        } else {
            playIncorrectSound();
            stop(); // Para a leitura quando errar
            const finalCorrectAnswers = correctAnswers;
            // Usar setTimeout para garantir que o estado seja atualizado antes de finalizar
            setTimeout(() => {
                finishGame({ totalCorrect: finalCorrectAnswers, history: updatedHistory });
            }, 1500);
        }
    };

    const handleNextQuestion = () => {
        // Para a leitura atual antes de avançar
        stop();
        // Para todos os sons (incluindo palmas) quando avançar para próxima pergunta
        stopAllSounds();

        const isLastQuestion = currentQuestionIndex + 1 >= questionsDeck.length;

        if (isLastQuestion) {
            finishGame();
            return;
        }

        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
    };

    // Se não há pergunta atual mas ainda estamos no estado de jogo, aguardar
    if (!currentQuestion && questionsDeck.length === 0) {
        return null;
    }

    const totalQuestions = questionsDeck.length || questions.length;
    const questionNumber = currentQuestionIndex + 1;

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
                            key={`${currentQuestion.question}-${index}`}
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

export default QuizScreen;