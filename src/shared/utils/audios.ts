import applauseUrl from '../../assets/sounds/palmas.mp3';
import failUrl from '../../assets/sounds/chorar.mp3';

function createAudioInstance(source: string): HTMLAudioElement {
  const audio = new Audio(source);
  audio.preload = 'auto';
  return audio;
}

// Lazy initialization para evitar problemas em ambiente de testes
let applauseAudio: HTMLAudioElement | null = null;
let failAudio: HTMLAudioElement | null = null;

function getApplauseAudio(): HTMLAudioElement {
  if (!applauseAudio) {
    applauseAudio = createAudioInstance(applauseUrl);
  }
  return applauseAudio;
}

function getFailAudio(): HTMLAudioElement {
  if (!failAudio) {
    failAudio = createAudioInstance(failUrl);
  }
  return failAudio;
}

export function playCorrectSound(): void {
  try {
    const audio = getApplauseAudio();
    audio.currentTime = 0;
    void audio.play();
  } catch {
    // Ignora erros em ambiente de testes
  }
}

export function playIncorrectSound(): void {
  try {
    const audio = getFailAudio();
    audio.currentTime = 0;
    void audio.play();
  } catch {
    // Ignora erros em ambiente de testes
  }
}

export function stopAllSounds(): void {
  try {
    if (applauseAudio) {
      applauseAudio.pause();
      applauseAudio.currentTime = 0;
    }
    if (failAudio) {
      failAudio.pause();
      failAudio.currentTime = 0;
    }
  } catch {
    // Ignora erros em ambiente de testes
  }
}

