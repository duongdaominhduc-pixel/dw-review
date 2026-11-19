import { describe, it, expect } from 'vitest';
import { predictCPT } from '../cpt';

describe('Compact Prediction Tree (CPT)', () => {
  it('predicts B for query [D, C] on test vector sequences', () => {
    // Sequences from Question 32 & Appendix B:
    // s1 = [A, B, C, D, F]
    // s2 = [D, C, B, E]
    // s3 = [E, A, D, C, B]
    // s4 = [E, G, A, D, B, C]
    const sequences = [
      ['A', 'B', 'C', 'D', 'F'],
      ['D', 'C', 'B', 'E'],
      ['E', 'A', 'D', 'C', 'B'],
      ['E', 'G', 'A', 'D', 'B', 'C'],
    ];

    const result = predictCPT(sequences, ['D', 'C']);

    // Suffix items after D and C:
    // s1: {F}
    // s2: {B, E}
    // s3: {B}
    // s4: {}
    // Candidate scores: B appears in s2 and s3 (score 2)
    expect(result.candidateScores['B']).toBe(2);
    expect(result.candidateScores['E']).toBe(1);
    expect(result.candidateScores['F']).toBe(1);
    expect(result.topItem).toBe('B');
  });
});
