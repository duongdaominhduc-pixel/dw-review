import { describe, it, expect } from 'vitest';
import {
  pairsFromFrequentItems,
  support,
  supportCount,
  confidence,
  lift,
  leverage,
} from '../rules';

describe('Association Rules Metrics', () => {
  it('pairsFromFrequentItems(6) returns 15', () => {
    expect(pairsFromFrequentItems(6)).toBe(15);
  });

  // 8 transactions from Question 28:
  // 1: {a, b, c}
  // 2: {a, b, c, d, e}
  // 3: {b}
  // 4: {c, d, e}
  // 5: {c}
  // 6: {b, c, d}
  // 7: {c, d, e}
  // 8: {c, e}
  const transactions = [
    ['a', 'b', 'c'],
    ['a', 'b', 'c', 'd', 'e'],
    ['b'],
    ['c', 'd', 'e'],
    ['c'],
    ['b', 'c', 'd'],
    ['c', 'd', 'e'],
    ['c', 'e'],
  ];

  it('calculates support for single items and combinations', () => {
    expect(support(['c'], transactions)).toBe(7 / 8);
    expect(support(['d', 'e'], transactions)).toBe(3 / 8);
    expect(support(['c', 'd', 'e'], transactions)).toBe(3 / 8);
  });

  it('calculates supportCount({c, d, b}) to be 2', () => {
    // Contains {c, d, b} are T2 {a, b, c, d, e} and T6 {b, c, d}
    expect(supportCount(['c', 'd', 'b'], transactions)).toBe(2);
  });

  it('calculates metrics for rule {c} -> {d, e}', () => {
    const sup = support(['c', 'd', 'e'], transactions);
    const conf = confidence(['c'], ['d', 'e'], transactions);
    const lft = lift(['c'], ['d', 'e'], transactions);
    const lev = leverage(['c'], ['d', 'e'], transactions);

    expect(sup).toBe(0.375); // 3/8
    expect(conf).toBeCloseTo(3 / 7, 4); // 0.4286
    expect(lft).toBeCloseTo(8 / 7, 4); // 1.1429
    expect(lev).toBeCloseTo(3 / 64, 6); // 0.046875
  });
});
