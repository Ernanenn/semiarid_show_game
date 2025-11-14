/**
 * Utilitário para embaralhar arrays usando o algoritmo Fisher-Yates
 */
export function shuffleArray<T>(source: T[], rng: () => number = Math.random): T[] {
  const array = [...source];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

