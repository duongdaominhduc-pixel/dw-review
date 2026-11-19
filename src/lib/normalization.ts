/**
 * Pure functions for Data Normalization:
 * Min-Max, Z-Score, Decimal Scaling
 */

/**
 * Min-Max Normalization:
 * v' = (v - min) / (max - min) * (newMax - newMin) + newMin
 */
export function minMax(
  v: number,
  min: number,
  max: number,
  newMin = 0,
  newMax = 1
): number {
  if (max === min) return newMin;
  return ((v - min) / (max - min)) * (newMax - newMin) + newMin;
}

/**
 * Z-Score Normalization:
 * v' = (v - mean) / stdDev
 */
export function zScore(v: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (v - mean) / stdDev;
}

/**
 * Decimal Scaling Normalization:
 * v' = v / 10^j, where j is the smallest integer such that max(|v'|) < 1
 */
export function decimalScaling(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const maxAbs = Math.max(...arr.map(x => Math.abs(x)));
  if (maxAbs === 0) return arr.map(() => 0);

  // Smallest j such that maxAbs / 10^j < 1
  // That means 10^j > maxAbs => j = Math.floor(Math.log10(maxAbs)) + 1
  const j = Math.floor(Math.log10(maxAbs)) + 1;
  const factor = Math.pow(10, j);

  return arr.map(x => Number((x / factor).toFixed(10)));
}
