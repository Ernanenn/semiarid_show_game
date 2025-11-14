import { useState, useEffect, useCallback } from 'react';
import { QuestionService } from '../services/questionService';
import { playCorrectSound, playIncorrectSound, stop, stopAndWait } from '../../../shared/utils';

/**
 * Hook customizado para gerenciar a lógica do quiz
 */
export function useQuiz(questions, onGameOver) {
  const [questionsDeck, setQuestionsDeck] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);

  // Inicializa o deck quando as questões mudam
  useEffect(() => {
    const deck = QuestionService.prepareDeck(questions);
    setQuestionsDeck(deck);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setAnswerHistory([]);
  }, [questions]);

  const currentQuestion = questionsDeck[currentQuestionIndex];

  const finishGame = useCallback(({ totalCorrect = correctAnswers, history = answerHistory } = {}) => {
    const totalQuestions = questionsDeck.length || questions.length;
    const scorePercentage = QuestionService.calculateScorePercentage(totalCorrect, totalQuestions);

    onGameOver({
      correctCount: totalCorrect,
      totalQuestions,
      scorePercentage,
      answers: history,
    });
  }, [correctAnswers, answerHistory, questionsDeck.length, questions.length, onGameOver]);

  const handleAnswerClick = useCallback(async (answer) => {
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
      stop();
      const finalCorrectAnswers = correctAnswers;
      setTimeout(() => {
        finishGame({ totalCorrect: finalCorrectAnswers, history: updatedHistory });
      }, 1500);
    }
  }, [currentQuestion, selectedAnswer, answerHistory, correctAnswers, finishGame]);

  const handleNextQuestion = useCallback(() => {
    stop();
    const isLastQuestion = currentQuestionIndex + 1 >= questionsDeck.length;

    if (isLastQuestion) {
      finishGame();
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  }, [currentQuestionIndex, questionsDeck.length, finishGame]);

  const totalQuestions = questionsDeck.length || questions.length;
  const questionNumber = currentQuestionIndex + 1;

  return {
    currentQuestion,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    handleAnswerClick,
    handleNextQuestion,
  };
}

