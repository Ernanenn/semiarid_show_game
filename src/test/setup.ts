import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock do Audio para ambiente de testes - DEVE ser definido antes de qualquer importação
// que use Audio (como audios.ts)
class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  load = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  currentTime = 0;
  preload: string = 'auto';
  volume = 1;
  muted = false;
  paused = true;
  ended = false;
  readyState = 4;
  constructor(_src?: string) {}
}

// @ts-expect-error - Mock para ambiente de testes
if (typeof global !== 'undefined') {
  global.Audio = MockAudio as unknown as typeof Audio;
}
// @ts-expect-error - Mock para ambiente de testes
if (typeof window !== 'undefined') {
  window.Audio = MockAudio as unknown as typeof Audio;
}

// Limpa após cada teste
afterEach(() => {
  cleanup();
});

// Extensão de matchers do jest-dom
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<T> {}
}

