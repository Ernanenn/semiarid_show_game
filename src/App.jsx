import React from 'react';
import styled from 'styled-components';
import { useGame } from './features/game/hooks/useGame';
import { ScoreService } from './features/scores/services/scoreService';
import { WelcomeScreen } from './features/welcome/components/WelcomeScreen';
import { QuizScreen } from './features/game/components/QuizScreen';
import { GameOverScreen } from './features/game/components/GameOverScreen';
import { Footer } from './shared/components/Footer';
import { questions } from './shared/data/questions';
import { GAME_STATES } from './shared/constants';
import bgImage from './assets/images/bg.png';

const Background = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  padding-bottom: 80px;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
  ${bgImage ? `background-image: url(${bgImage});` : ''}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.backgroundOverlay};
    opacity: 0.95;
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -20%;
    background: radial-gradient(
        circle at top left,
        rgba(255, 215, 0, 0.18),
        transparent 55%
      ),
      radial-gradient(circle at bottom right, rgba(143, 45, 45, 0.2), transparent 50%);
    z-index: -1;
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
    padding-bottom: 80px;
    background-attachment: scroll;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
    padding-bottom: 70px;
    background-attachment: scroll;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 90%;
    padding: ${({ theme }) => theme.spacing.md};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

function App() {
  const {
    gameState,
    playerInfo,
    gameSummary,
    startGame,
    endGame,
    restartGame,
  } = useGame();

  const handleGameOver = async (summary) => {
    // Atualizar estados de forma síncrona primeiro
    endGame(summary);
    
    // Salvar score no backend (não bloqueia a UI)
    try {
      await ScoreService.saveScore({
        name: playerInfo.name,
        location: playerInfo.location,
        state: playerInfo.locationState,
        scorePercentage: summary.scorePercentage,
        correctAnswers: summary.correctCount,
        totalQuestions: summary.totalQuestions,
      });
    } catch (error) {
      console.error('Erro ao salvar score:', error);
      // Não bloqueia a exibição do resultado mesmo se falhar
    }
  };

  return (
    <>
      <Background>
        <ContentArea>
          {gameState === GAME_STATES.WELCOME && (
            <WelcomeScreen onStartGame={startGame} />
          )}

          {gameState === GAME_STATES.PLAYING && (
            <QuizScreen questions={questions} onGameOver={handleGameOver} />
          )}

          {gameState === GAME_STATES.GAMEOVER && (
            <GameOverScreen
              playerName={playerInfo.name}
              gameSummary={gameSummary}
              onRestart={restartGame}
            />
          )}
        </ContentArea>
      </Background>
      <Footer
        email="ernanenn@gmail.com"
        linkedin="https://www.linkedin.com/in/ernane-nogueira-nunes-822143112/"
        github="https://github.com/Ernanenn"
      />
    </>
  );
}

export default App;
