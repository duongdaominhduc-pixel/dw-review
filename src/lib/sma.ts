/**
 * Pure function for Simple Moving Average (SMA)
 */

/**
 * Computes SMA with window size k.
 * For indices < k - 1, returns null.
 * For index i >= k - 1, returns average of prices from (i - k + 1) to i.
 */
export function sma(prices: number[], k: number): (number | null)[] {
  if (k <= 0) return prices.map(() => null);

  const result: (number | null)[] = [];
  let windowSum = 0;

  for (let i = 0; i < prices.length; i++) {
    windowSum += prices[i];

    if (i >= k) {
      windowSum -= prices[i - k];
    }

    if (i >= k - 1) {
      result.push(windowSum / k);
    } else {
      result.push(null);
    }
  }

  return result;
}
