import { useEffect } from 'react';
import { speak, stop } from '../../../shared/utils';

/**
 * Hook para gerenciar a leitura por voz de perguntas e alternativas
 */
export function useVoiceReading(currentQuestion) {
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
}

