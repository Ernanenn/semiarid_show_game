/**
 * Utilitário para usar o Responsive Voice
 * Verifica se a biblioteca está disponível antes de usar
 */

const isResponsiveVoiceAvailable = () => {
  return typeof window !== 'undefined' && window.responsiveVoice;
};

/**
 * Lê um texto usando Responsive Voice
 * @param {string} text - Texto a ser lido
 * @param {object} options - Opções de voz (padrão: voz brasileira feminina)
 */
export const speak = (text, options = {}) => {
  if (!isResponsiveVoiceAvailable() || !text) {
    return;
  }

  const defaultOptions = {
    pitch: 1,
    rate: 1,
    volume: 1,
    onstart: null,
    onend: null,
    onerror: null,
  };

  const voiceOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    window.responsiveVoice.speak(
      text,
      'Brazilian Portuguese Female',
      voiceOptions
    );
  } catch (error) {
    console.warn('Erro ao usar Responsive Voice:', error);
  }
};

/**
 * Para a leitura atual
 */
export const stop = () => {
  if (isResponsiveVoiceAvailable()) {
    try {
      window.responsiveVoice.cancel();
    } catch (error) {
      console.warn('Erro ao parar Responsive Voice:', error);
    }
  }
};

/**
 * Para a leitura atual e aguarda até que pare completamente
 * @returns {Promise} Promise que resolve quando a leitura parou
 */
export const stopAndWait = () => {
  return new Promise((resolve) => {
    if (!isResponsiveVoiceAvailable()) {
      resolve();
      return;
    }

    try {
      window.responsiveVoice.cancel();
      
      // Verifica periodicamente se a leitura parou
      const checkInterval = setInterval(() => {
        if (!window.responsiveVoice.isPlaying()) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50); // Verifica a cada 50ms

      // Timeout de segurança (máximo 500ms)
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 500);
    } catch (error) {
      console.warn('Erro ao parar Responsive Voice:', error);
      resolve();
    }
  });
};

/**
 * Verifica se está falando no momento
 */
export const isPlaying = () => {
  if (isResponsiveVoiceAvailable()) {
    try {
      return window.responsiveVoice.isPlaying();
    } catch (error) {
      console.warn('Erro ao verificar estado do Responsive Voice:', error);
      return false;
    }
  }
  return false;
};

