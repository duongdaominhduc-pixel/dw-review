import { describe, it, expect } from 'vitest';
import { sma } from '../sma';

describe('Simple Moving Average (SMA)', () => {
  it('calculates SMA for [75, 78, 76, 80, 82, 81] with k=3', () => {
    const prices = [75, 78, 76, 80, 82, 81];
    const result = sma(prices, 3);

    // Day 1 (index 0): null
    expect(result[0]).toBeNull();
    // Day 2 (index 1): null
    expect(result[1]).toBeNull();
    // Day 3 (index 2): (75 + 78 + 76) / 3 = 76.3333...
    expect(result[2]!).toBeCloseTo(76.3333, 4);
    // Day 4 (index 3): (78 + 76 + 80) / 3 = 78
    expect(result[3]!).toBeCloseTo(78.0, 4);
    // Day 5 (index 4): (76 + 80 + 82) / 3 = 79.3333...
    expect(result[4]!).toBeCloseTo(79.3333, 4);
    // Day 6 (index 5): (80 + 82 + 81) / 3 = 81
    expect(result[5]!).toBeCloseTo(81.0, 4);
  });
});
