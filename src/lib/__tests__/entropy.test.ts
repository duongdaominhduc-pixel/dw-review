import { describe, it, expect } from 'vitest';
import { entropy, infoA, infoGain } from '../entropy';

describe('Entropy and Information Gain', () => {
  it('calculates entropy([6, 4]) to be ~0.9710', () => {
    expect(entropy([6, 4])).toBeCloseTo(0.9710, 4);
  });

  it('calculates entropy([5, 5]) to be 1', () => {
    expect(entropy([5, 5])).toBeCloseTo(1.0, 4);
  });

  it('calculates entropy([10, 0]) to be 0', () => {
    expect(entropy([10, 0])).toBeCloseTo(0, 4);
  });

  it('calculates Info_A and InfoGain correctly', () => {
    // Parent: 14 samples (9 Yes, 5 No)
    const parent = [9, 5];
    const parentEnt = entropy(parent);
    expect(parentEnt).toBeCloseTo(0.9403, 4);

    // Attribute A splits into: [2, 3] (5 samples), [4, 0] (4 samples), [3, 2] (5 samples)
    const subsets = [[2, 3], [4, 0], [3, 2]];
    const expectedInfo = infoA(subsets);
    expect(expectedInfo).toBeCloseTo(0.6935, 4);

    const gain = infoGain(parent, subsets);
    expect(gain).toBeCloseTo(0.2467, 4);
  });
});
