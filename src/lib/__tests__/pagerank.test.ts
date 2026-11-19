import { describe, it, expect } from 'vitest';
import { calculatePageRankStep, PageRankGraph } from '../pagerank';

describe('PageRank Algorithm', () => {
  it('calculates iteration 1 for 5-page graph with damping d=0.85', () => {
    // Edges from Appendix B:
    // 1->2, 2->5, 3->1, 3->2, 3->4, 3->5, 4->3, 4->5, 5->4
    const graph: PageRankGraph = {
      nodes: [1, 2, 3, 4, 5],
      edges: [
        [1, 2],
        [2, 5],
        [3, 1],
        [3, 2],
        [3, 4],
        [3, 5],
        [4, 3],
        [4, 5],
        [5, 4],
      ],
    };

    const initialRanks = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    const step1 = calculatePageRankStep(graph, initialRanks, 0.85);

    // PR(2) = (1 - 0.85) + 0.85 * (1/1 + 1/4) = 0.15 + 0.85 * 1.25 = 1.2125
    expect(step1.ranks[2]).toBeCloseTo(1.2125, 4);

    // PR(1) = (1 - 0.85) + 0.85 * (1/4) = 0.15 + 0.2125 = 0.3625
    expect(step1.ranks[1]).toBeCloseTo(0.3625, 4);
  });
});
