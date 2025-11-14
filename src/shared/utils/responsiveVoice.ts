/**
 * Utilitário para usar o Responsive Voice
 * Verifica se a biblioteca está disponível antes de usar
 */

interface ResponsiveVoiceOptions {
  pitch?: number;
  rate?: number;
  volume?: number;
  onstart?: (() => void) | null;
  onend?: (() => void) | null;
  onerror?: ((error: Error) => void) | null;
}

interface ResponsiveVoiceWindow extends Window {
  responsiveVoice?: {
    speak: (text: string, voice: string, options: ResponsiveVoiceOptions) => void;
    cancel: () => void;
    isPlaying: () => boolean;
  };
}

const isResponsiveVoiceAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!(window as ResponsiveVoiceWindow).responsiveVoice;
};

/**
 * Lê um texto usando Responsive Voice
 * @param text - Texto a ser lido
 * @param options - Opções de voz (padrão: voz brasileira feminina)
 */
export const speak = (text: string, options: Partial<ResponsiveVoiceOptions> = {}): void => {
  if (!isResponsiveVoiceAvailable() || !text) {
    return;
  }

  const defaultOptions: ResponsiveVoiceOptions = {
    pitch: 1,
    rate: 1,
    volume: 1,
    onstart: null,
    onend: null,
    onerror: null,
  };

  const voiceOptions: ResponsiveVoiceOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const rvWindow = window as ResponsiveVoiceWindow;
    if (rvWindow.responsiveVoice) {
      rvWindow.responsiveVoice.speak(text, 'Brazilian Portuguese Female', voiceOptions);
    }
  } catch (error) {
    console.warn('Erro ao usar Responsive Voice:', error);
  }
};

/**
 * Para a leitura atual
 */
export const stop = (): void => {
  if (isResponsiveVoiceAvailable()) {
    try {
      const rvWindow = window as ResponsiveVoiceWindow;
      if (rvWindow.responsiveVoice) {
        rvWindow.responsiveVoice.cancel();
      }
    } catch (error) {
      console.warn('Erro ao parar Responsive Voice:', error);
    }
  }
};

/**
 * Para a leitura atual e aguarda até que pare completamente
 * @returns Promise que resolve quando a leitura parou
 */
export const stopAndWait = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!isResponsiveVoiceAvailable()) {
      resolve();
      return;
    }

    try {
      const rvWindow = window as ResponsiveVoiceWindow;
      if (rvWindow.responsiveVoice) {
        rvWindow.responsiveVoice.cancel();

        // Verifica periodicamente se a leitura parou
        const checkInterval = setInterval(() => {
          if (rvWindow.responsiveVoice && !rvWindow.responsiveVoice.isPlaying()) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 50); // Verifica a cada 50ms

        // Timeout de segurança (máximo 500ms)
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 500);
      } else {
        resolve();
      }
    } catch (error) {
      console.warn('Erro ao parar Responsive Voice:', error);
      resolve();
    }
  });
};

/**
 * Verifica se está falando no momento
 */
export const isPlaying = (): boolean => {
  if (isResponsiveVoiceAvailable()) {
    try {
      const rvWindow = window as ResponsiveVoiceWindow;
      return rvWindow.responsiveVoice?.isPlaying() ?? false;
    } catch (error) {
      console.warn('Erro ao verificar estado do Responsive Voice:', error);
      return false;
    }
  }
  return false;
};

