/**
 * Pure functions for Association Rules:
 * Combinations, Support, Confidence, Lift, Leverage
 */

/**
 * Calculates number of 2-item combinations from n frequent items:
 * C(n, 2) = n * (n - 1) / 2
 */
export function pairsFromFrequentItems(n: number): number {
  if (n < 2) return 0;
  return (n * (n - 1)) / 2;
}

/**
 * Checks if a transaction contains all items in an itemset
 */
export function containsItemset(transaction: string[], itemset: string[]): boolean {
  const set = new Set(transaction);
  return itemset.every(item => set.has(item));
}

/**
 * Counts how many transactions contain the entire itemset
 */
export function supportCount(itemset: string[], transactions: string[][]): number {
  if (itemset.length === 0) return transactions.length;
  return transactions.filter(t => containsItemset(t, itemset)).length;
}

/**
 * Support of an itemset: count / totalTransactions
 */
export function support(itemset: string[], transactions: string[][]): number {
  if (transactions.length === 0) return 0;
  return supportCount(itemset, transactions) / transactions.length;
}

/**
 * Confidence of rule X -> Y:
 * Conf(X -> Y) = Sup(X U Y) / Sup(X)
 */
export function confidence(
  X: string[],
  Y: string[],
  transactions: string[][]
): number {
  const supX = support(X, transactions);
  if (supX === 0) return 0;

  const union = Array.from(new Set([...X, ...Y]));
  const supUnion = support(union, transactions);

  return supUnion / supX;
}

/**
 * Lift of rule X -> Y:
 * Lift(X -> Y) = Sup(X U Y) / (Sup(X) * Sup(Y))
 */
export function lift(
  X: string[],
  Y: string[],
  transactions: string[][]
): number {
  const supX = support(X, transactions);
  const supY = support(Y, transactions);
  if (supX === 0 || supY === 0) return 0;

  const union = Array.from(new Set([...X, ...Y]));
  const supUnion = support(union, transactions);

  return supUnion / (supX * supY);
}

/**
 * Leverage of rule X -> Y:
 * Leverage(X -> Y) = Sup(X U Y) - (Sup(X) * Sup(Y))
 */
export function leverage(
  X: string[],
  Y: string[],
  transactions: string[][]
): number {
  const supX = support(X, transactions);
  const supY = support(Y, transactions);
  const union = Array.from(new Set([...X, ...Y]));
  const supUnion = support(union, transactions);

  return supUnion - supX * supY;
}
