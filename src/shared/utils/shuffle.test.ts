import { describe, it, expect, vi } from 'vitest';
import { shuffleArray } from './shuffle';

describe('shuffleArray', () => {
  it('deve retornar um array com os mesmos elementos', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it('não deve modificar o array original', () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];
    shuffleArray(original);

    expect(original).toEqual(originalCopy);
  });

  it('deve funcionar com arrays vazios', () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]);
  });

  it('deve funcionar com arrays de um elemento', () => {
    const result = shuffleArray([42]);
    expect(result).toEqual([42]);
  });

  it('deve usar o gerador de números aleatórios fornecido', () => {
    const mockRng = vi.fn(() => 0.5); // Sempre retorna 0.5
    const array = [1, 2, 3, 4, 5];
    const result = shuffleArray(array, mockRng);

    expect(mockRng).toHaveBeenCalled();
    expect(result).toHaveLength(array.length);
  });

  it('deve funcionar com diferentes tipos de dados', () => {
    const strings = ['a', 'b', 'c'];
    const shuffledStrings = shuffleArray(strings);
    expect(shuffledStrings).toHaveLength(3);

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const shuffledObjects = shuffleArray(objects);
    expect(shuffledObjects).toHaveLength(3);
  });
});

