import { describe, it, expect } from 'vitest';
import { minMax, zScore, decimalScaling } from '../normalization';

describe('Normalization', () => {
  it('minMax(8, min=5, max=10) returns 0.6', () => {
    expect(minMax(8, 5, 10)).toBeCloseTo(0.6, 4);
  });

  it('minMax handles boundary values', () => {
    expect(minMax(5, 5, 10)).toBe(0);
    expect(minMax(10, 5, 10)).toBe(1);
  });

  it('zScore calculates correctly', () => {
    // Mean = 50, Std = 10, v = 65 => (65-50)/10 = 1.5
    expect(zScore(65, 50, 10)).toBe(1.5);
    expect(zScore(50, 50, 10)).toBe(0);
  });

  it('decimalScaling([986, 12, 45]) returns [0.986, 0.012, 0.045]', () => {
    const result = decimalScaling([986, 12, 45]);
    expect(result).toEqual([0.986, 0.012, 0.045]);
  });
});
