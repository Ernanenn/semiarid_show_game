import applauseUrl from '../assets/sounds/palmas.mp3';
import failUrl from '../assets/sounds/chorar.mp3';

function createAudioInstance(source) {
  const audio = new Audio(source);
  audio.preload = 'auto';
  return audio;
}

const applauseAudio = createAudioInstance(applauseUrl);
const failAudio = createAudioInstance(failUrl);

export function playCorrectSound() {
  if (!applauseAudio) return;
  applauseAudio.currentTime = 0;
  void applauseAudio.play();
}

export function playIncorrectSound() {
  if (!failAudio) return;
  failAudio.currentTime = 0;
  void failAudio.play();
}

export function stopAllSounds() {
  if (applauseAudio) {
    applauseAudio.pause();
    applauseAudio.currentTime = 0;
  }
  if (failAudio) {
    failAudio.pause();
    failAudio.currentTime = 0;
  }
}