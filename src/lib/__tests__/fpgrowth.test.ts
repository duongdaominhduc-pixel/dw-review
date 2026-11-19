import { describe, it, expect } from 'vitest';
import {
  countItems,
  getFrequentItems,
  buildFPTree,
  getConditionalPatternBase,
} from '../fpgrowth';

describe('FP-Growth Algorithm', () => {
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

  it('counts items and filters/sorts with minsup = 4', () => {
    const counts = countItems(transactions);
    expect(counts['a']).toBe(2);
    expect(counts['b']).toBe(4);
    expect(counts['c']).toBe(7);
    expect(counts['d']).toBe(4);
    expect(counts['e']).toBe(4);

    const frequent = getFrequentItems(transactions, 4);
    // c:7, then b, d, e (4 each). 'a' is filtered out.
    expect(frequent.map(f => f.item)).toContain('c');
    expect(frequent.find(f => f.item === 'a')).toBeUndefined();
    expect(frequent[0].item).toBe('c');
    expect(frequent).toHaveLength(4);

    const tree = buildFPTree(transactions, 4);
    // Transaction 2 ({a, b, c, d, e}) filtered and sorted must have 'c' first and not contain 'a'
    const t2Filtered = tree.filteredTransactions[1];
    expect(t2Filtered[0]).toBe('c');
    expect(t2Filtered).not.toContain('a');
  });

  it('matches test vector from FP-Growth_Sol.pdf', () => {
    // 5 transactions:
    // T1: F, C, A, M, P
    // T2: F, C, A, B, M
    // T3: F, B
    // T4: C, B, P
    // T5: F, C, A, M, P
    const solTransactions = [
      ['F', 'C', 'A', 'M', 'P'],
      ['F', 'C', 'A', 'B', 'M'],
      ['F', 'B'],
      ['C', 'B', 'P'],
      ['F', 'C', 'A', 'M', 'P'],
    ];

    // Priority order in slide/pdf: F (4), C (4), A (3), B (3), M (3), P (2)
    const customOrder = [
      { item: 'F', count: 4 },
      { item: 'C', count: 4 },
      { item: 'A', count: 3 },
      { item: 'B', count: 3 },
      { item: 'M', count: 3 },
      { item: 'P', count: 2 },
    ];

    const tree = buildFPTree(solTransactions, 2, customOrder);

    // Conditional Pattern Base of P
    const cpbP = getConditionalPatternBase('P', tree);
    expect(cpbP).toEqual([
      { path: ['F', 'C', 'A', 'M'], count: 2 },
      { path: ['C', 'B'], count: 1 },
    ]);

    // Conditional Pattern Base of M
    const cpbM = getConditionalPatternBase('M', tree);
    expect(cpbM).toEqual([
      { path: ['F', 'C', 'A'], count: 2 },
      { path: ['F', 'C', 'A', 'B'], count: 1 },
    ]);

    // Conditional Pattern Base of B
    const cpbB = getConditionalPatternBase('B', tree);
    expect(cpbB).toEqual([
      { path: ['F', 'C', 'A'], count: 1 },
      { path: ['F'], count: 1 },
      { path: ['C'], count: 1 },
    ]);

    // Conditional Pattern Base of A
    const cpbA = getConditionalPatternBase('A', tree);
    expect(cpbA).toEqual([
      { path: ['F', 'C'], count: 3 },
    ]);

    // Conditional Pattern Base of C
    const cpbC = getConditionalPatternBase('C', tree);
    expect(cpbC).toEqual([
      { path: ['F'], count: 3 },
    ]);
  });
});
