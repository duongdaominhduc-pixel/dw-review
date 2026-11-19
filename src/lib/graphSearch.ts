/**
 * Pure functions for Breadth-First Search (BFS) and Depth-First Search (DFS)
 */

export interface GraphTraversalResult {
  visited: string[];
  steps: {
    currentNode: string;
    frontier: string[]; // queue for BFS, stack for DFS
    visitedSoFar: string[];
    description: string;
  }[];
}

/**
 * Breadth-First Search (BFS) using a Queue (FIFO)
 */
export function bfs(
  graph: Record<string, string[]>,
  startNode: string
): GraphTraversalResult {
  const visited: string[] = [];
  const visitedSet = new Set<string>();
  const queue: string[] = [startNode];
  const inQueue = new Set<string>([startNode]);

  const steps: GraphTraversalResult['steps'] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.push(current);
    visitedSet.add(current);

    const neighbors = (graph[current] || []).filter(
      n => !visitedSet.has(n) && !inQueue.has(n)
    );

    for (const neighbor of neighbors) {
      queue.push(neighbor);
      inQueue.add(neighbor);
    }

    steps.push({
      currentNode: current,
      frontier: [...queue],
      visitedSoFar: [...visited],
      description: `Thăm nút ${current}. Hàng đợi (Queue) tiếp theo: [${queue.join(', ')}]`,
    });
  }

  return { visited, steps };
}

/**
 * Depth-First Search (DFS) using a Stack (LIFO)
 */
export function dfs(
  graph: Record<string, string[]>,
  startNode: string
): GraphTraversalResult {
  const visited: string[] = [];
  const visitedSet = new Set<string>();
  const stack: string[] = [startNode];

  const steps: GraphTraversalResult['steps'] = [];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visitedSet.has(current)) continue;

    visited.push(current);
    visitedSet.add(current);

    // Get unvisited neighbors. Reverse to visit in alphabetical / natural order when popped
    const neighbors = (graph[current] || []).filter(n => !visitedSet.has(n));
    const sortedNeighbors = [...neighbors].reverse();

    for (const neighbor of sortedNeighbors) {
      stack.push(neighbor);
    }

    steps.push({
      currentNode: current,
      frontier: [...stack],
      visitedSoFar: [...visited],
      description: `Thăm nút ${current}. Ngăn xếp (Stack) tiếp theo: [${stack.join(', ')}]`,
    });
  }

  return { visited, steps };
}
