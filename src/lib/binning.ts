/**
 * Pure functions for Binning:
 * Equal-width, Equal-frequency
 */

/**
 * Generates equal-width intervals [lower, upper]
 * width = (max - min) / k
 */
export function equalWidthBins(
  min: number,
  max: number,
  k: number
): [number, number][] {
  if (k <= 0) return [];
  const width = (max - min) / k;
  const bins: [number, number][] = [];

  for (let i = 0; i < k; i++) {
    const start = min + i * width;
    const end = i === k - 1 ? max : min + (i + 1) * width;
    bins.push([Number(start.toFixed(4)), Number(end.toFixed(4))]);
  }

  return bins;
}

/**
 * Distributes sorted values into k equal-frequency bins
 */
export function equalFrequencyBins(
  sortedValues: number[],
  k: number
): number[][] {
  if (k <= 0 || sortedValues.length === 0) return [];

  const n = sortedValues.length;
  const baseSize = Math.floor(n / k);
  const remainder = n % k;

  const bins: number[][] = [];
  let currentIndex = 0;

  for (let i = 0; i < k; i++) {
    const binSize = baseSize + (i < remainder ? 1 : 0);
    bins.push(sortedValues.slice(currentIndex, currentIndex + binSize));
    currentIndex += binSize;
  }

  return bins;
}
