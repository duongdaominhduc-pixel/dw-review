/**
 * Pure functions for PageRank algorithm
 */

export interface PageRankGraph {
  nodes: number[];
  edges: [number, number][]; // [from, to]
}

export interface PageRankStepDetail {
  node: number;
  inLinks: { from: number; pr: number; outDegree: number; contribution: number }[];
  baseScore: number;
  transferredScore: number;
  newPR: number;
  formulaString: string;
}

export interface PageRankIterationResult {
  step: number;
  ranks: Record<number, number>;
  details: Record<number, PageRankStepDetail>;
}

/**
 * Computes out-degree for each node
 */
export function getOutDegrees(graph: PageRankGraph): Record<number, number> {
  const outDeg: Record<number, number> = {};
  for (const n of graph.nodes) {
    outDeg[n] = 0;
  }
  for (const [from] of graph.edges) {
    outDeg[from] = (outDeg[from] || 0) + 1;
  }
  return outDeg;
}

/**
 * Computes in-links for each node
 */
export function getInLinks(graph: PageRankGraph): Record<number, number[]> {
  const inLinks: Record<number, number[]> = {};
  for (const n of graph.nodes) {
    inLinks[n] = [];
  }
  for (const [from, to] of graph.edges) {
    if (!inLinks[to]) inLinks[to] = [];
    inLinks[to].push(from);
  }
  return inLinks;
}

/**
 * Executes a single PageRank iteration
 * Formula: PR_{t+1}(v) = (1 - d) + d * \sum_{u in In(v)} (PR_t(u) / C(u))
 */
export function calculatePageRankStep(
  graph: PageRankGraph,
  currentRanks: Record<number, number>,
  d = 0.85
): PageRankIterationResult {
  const outDegrees = getOutDegrees(graph);
  const inLinks = getInLinks(graph);
  const baseScore = 1 - d;

  const nextRanks: Record<number, number> = {};
  const details: Record<number, PageRankStepDetail> = {};

  for (const node of graph.nodes) {
    const incoming = inLinks[node] || [];
    let sumTransferred = 0;
    const linkDetails: PageRankStepDetail['inLinks'] = [];

    for (const fromNode of incoming) {
      const outDeg = outDegrees[fromNode] || 1;
      const fromPR = currentRanks[fromNode] ?? 1;
      const contribution = fromPR / outDeg;
      sumTransferred += contribution;

      linkDetails.push({
        from: fromNode,
        pr: fromPR,
        outDegree: outDeg,
        contribution,
      });
    }

    const newPR = baseScore + d * sumTransferred;
    nextRanks[node] = Number(newPR.toFixed(6));

    const termsStr = linkDetails.length > 0
      ? linkDetails.map(l => `${l.pr}/${l.outDegree}`).join(' + ')
      : '0';

    details[node] = {
      node,
      inLinks: linkDetails,
      baseScore,
      transferredScore: sumTransferred,
      newPR: nextRanks[node],
      formulaString: `PR(${node}) = (1 - ${d}) + ${d} * (${termsStr}) = ${newPR.toFixed(4)}`,
    };
  }

  return {
    step: 1,
    ranks: nextRanks,
    details,
  };
}
