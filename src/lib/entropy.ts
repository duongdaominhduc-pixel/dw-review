/**
 * Pure functions for Entropy, Info_A, Information Gain
 */

/**
 * Calculates Entropy of class counts.
 * Formula: Info(D) = - \sum p_i * log2(p_i)
 */
export function entropy(counts: number[]): number {
  const validCounts = counts.filter(c => c > 0);
  const total = validCounts.reduce((sum, c) => sum + c, 0);
  if (total === 0) return 0;

  let sum = 0;
  for (const c of validCounts) {
    const p = c / total;
    sum -= p * Math.log2(p);
  }

  return Math.abs(sum); // Avoid negative zero
}

/**
 * Calculates Expected Entropy after partitioning on attribute A
 * Formula: Info_A(D) = \sum (|D_j| / |D|) * Info(D_j)
 */
export function infoA(subsets: number[][]): number {
  const total = subsets.reduce((sum, sub) => sum + sub.reduce((s, c) => s + c, 0), 0);
  if (total === 0) return 0;

  let expectedInfo = 0;
  for (const subset of subsets) {
    const subsetTotal = subset.reduce((s, c) => s + c, 0);
    if (subsetTotal > 0) {
      const weight = subsetTotal / total;
      expectedInfo += weight * entropy(subset);
    }
  }

  return expectedInfo;
}

/**
 * Information Gain: Gain(A) = Info(D) - Info_A(D)
 */
export function infoGain(parentCounts: number[], subsets: number[][]): number {
  return entropy(parentCounts) - infoA(subsets);
}
