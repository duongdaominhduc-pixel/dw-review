/**
 * Pure functions for Compact Prediction Tree (CPT)
 */

export interface SequenceSuffixInfo {
  seqIndex: number;
  sequence: string[];
  suffixItems: string[];
}

export interface CPTPredictionResult {
  query: string[];
  matchedSequences: SequenceSuffixInfo[];
  candidateScores: Record<string, number>;
  topItem: string | null;
}

/**
 * Predicts next item using Compact Prediction Tree logic:
 * For each sequence that contains the query items, extract items appearing
 * after the query occurrence, count occurrences and pick the highest scored item.
 */
export function predictCPT(
  sequences: string[][],
  query: string[]
): CPTPredictionResult {
  const matchedSequences: SequenceSuffixInfo[] = [];
  const candidateScores: Record<string, number> = {};

  for (let sIdx = 0; sIdx < sequences.length; sIdx++) {
    const seq = sequences[sIdx];

    // Check if seq contains all query items
    const containsAll = query.every(q => seq.includes(q));
    if (!containsAll) continue;

    // Find the position after matching query
    // In CPT, find the position of the last query item that appears after earlier query items
    // or the index after the last item of query
    let lastMatchIdx = -1;
    let queryIdx = 0;

    for (let i = 0; i < seq.length; i++) {
      if (queryIdx < query.length && seq[i] === query[queryIdx]) {
        queryIdx++;
        lastMatchIdx = i;
      }
    }

    // If all query items appeared in order:
    if (queryIdx === query.length && lastMatchIdx !== -1) {
      const suffixItems = seq.slice(lastMatchIdx + 1);
      matchedSequences.push({
        seqIndex: sIdx + 1,
        sequence: seq,
        suffixItems,
      });

      // Count each unique item in suffix
      const uniqueSuffix = new Set(suffixItems);
      for (const item of uniqueSuffix) {
        candidateScores[item] = (candidateScores[item] || 0) + 1;
      }
    } else {
      // In case query items appear out-of-order in sequence,
      // take items appearing after both items have appeared
      const indices = query.map(q => seq.indexOf(q));
      const maxIdx = Math.max(...indices);
      const suffixItems = seq.slice(maxIdx + 1);

      matchedSequences.push({
        seqIndex: sIdx + 1,
        sequence: seq,
        suffixItems,
      });

      const uniqueSuffix = new Set(suffixItems);
      for (const item of uniqueSuffix) {
        candidateScores[item] = (candidateScores[item] || 0) + 1;
      }
    }
  }

  // Find top item
  let topItem: string | null = null;
  let maxScore = -1;

  for (const [item, score] of Object.entries(candidateScores)) {
    if (score > maxScore) {
      maxScore = score;
      topItem = item;
    }
  }

  return {
    query,
    matchedSequences,
    candidateScores,
    topItem,
  };
}
