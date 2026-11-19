/**
 * Pure functions for FP-Growth Algorithm:
 * Item counting, filtering, FP-Tree building, Conditional Pattern Base extraction
 */

export interface FrequentItem {
  item: string;
  count: number;
}

export interface FPNodeInfo {
  id: string;
  item: string;
  count: number;
  parentId: string | null;
  children: FPNodeInfo[];
}

export class FPNode {
  id: string;
  item: string;
  count: number;
  parent: FPNode | null = null;
  children: Map<string, FPNode> = new Map();
  nodeLink: FPNode | null = null;

  constructor(item: string, count = 1, parent: FPNode | null = null) {
    this.id = Math.random().toString(36).substring(2, 9);
    this.item = item;
    this.count = count;
    this.parent = parent;
  }

  toJSON(): FPNodeInfo {
    return {
      id: this.id,
      item: this.item,
      count: this.count,
      parentId: this.parent ? this.parent.id : null,
      children: Array.from(this.children.values()).map(c => c.toJSON()),
    };
  }
}

/**
 * Counts item frequencies across all transactions
 */
export function countItems(transactions: string[][]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const t of transactions) {
    const unique = new Set(t);
    for (const item of unique) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }
  return counts;
}

/**
 * Filters items by minsupCount and sorts them descending by frequency.
 * In case of tie, sorts alphabetically for deterministic behavior.
 */
export function getFrequentItems(
  transactions: string[][],
  minsupCount: number
): FrequentItem[] {
  const counts = countItems(transactions);
  return Object.entries(counts)
    .filter(([_, count]) => count >= minsupCount)
    .map(([item, count]) => ({ item, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.item.localeCompare(b.item);
    });
}

/**
 * Filters and orders each transaction based on frequent items priority
 */
export function filterAndSortTransactions(
  transactions: string[][],
  frequentItems: FrequentItem[]
): string[][] {
  const itemOrder = new Map<string, number>();
  frequentItems.forEach((fi, idx) => itemOrder.set(fi.item, idx));

  return transactions.map(t => {
    return t
      .filter(item => itemOrder.has(item))
      .sort((a, b) => (itemOrder.get(a)! - itemOrder.get(b)!));
  });
}

export interface FPTreeResult {
  root: FPNode;
  headerTable: Map<string, { count: number; head: FPNode | null }>;
  frequentItems: FrequentItem[];
  filteredTransactions: string[][];
}

/**
 * Builds an FP-Tree from transactions and minsupCount
 */
export function buildFPTree(
  transactions: string[][],
  minsupCount: number,
  customFrequentItems?: FrequentItem[]
): FPTreeResult {
  const frequentItems = customFrequentItems || getFrequentItems(transactions, minsupCount);
  const filteredTransactions = filterAndSortTransactions(transactions, frequentItems);

  const root = new FPNode('root', 0);
  const headerTable = new Map<string, { count: number; head: FPNode | null }>();

  for (const fi of frequentItems) {
    headerTable.set(fi.item, { count: fi.count, head: null });
  }

  for (const trans of filteredTransactions) {
    if (trans.length === 0) continue;
    let curr = root;

    for (const item of trans) {
      if (curr.children.has(item)) {
        const child = curr.children.get(item)!;
        child.count += 1;
        curr = child;
      } else {
        const newNode = new FPNode(item, 1, curr);
        curr.children.set(item, newNode);

        // Update header table linked list
        const header = headerTable.get(item);
        if (header) {
          if (!header.head) {
            header.head = newNode;
          } else {
            let last = header.head;
            while (last.nodeLink) {
              last = last.nodeLink;
            }
            last.nodeLink = newNode;
          }
        }

        curr = newNode;
      }
    }
  }

  return { root, headerTable, frequentItems, filteredTransactions };
}

export interface ConditionalPattern {
  path: string[];
  count: number;
}

/**
 * Extracts Conditional Pattern Base for a specific item
 */
export function getConditionalPatternBase(
  targetItem: string,
  treeResult: FPTreeResult
): ConditionalPattern[] {
  const patterns: ConditionalPattern[] = [];
  const header = treeResult.headerTable.get(targetItem);
  if (!header || !header.head) return patterns;

  let curr: FPNode | null = header.head;
  while (curr) {
    const count = curr.count;
    const path: string[] = [];
    let p = curr.parent;

    while (p && p.item !== 'root') {
      path.unshift(p.item);
      p = p.parent;
    }

    if (path.length > 0) {
      patterns.push({ path, count });
    }

    curr = curr.nodeLink;
  }

  return patterns;
}
