import { describe, it, expect } from 'vitest';
import { bfs, dfs } from '../graphSearch';

describe('Graph Traversal: BFS & DFS', () => {
  // Graph:
  // A -> B, C
  // B -> D, E
  // C -> E
  // D -> E
  // E -> none
  const graph: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['E'],
    D: ['E'],
    E: [],
  };

  it('runs BFS visiting level by level', () => {
    const result = bfs(graph, 'A');
    // Level 0: A
    // Level 1: B, C
    // Level 2: D, E
    expect(result.visited).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('runs DFS visiting branch first', () => {
    const result = dfs(graph, 'A');
    // A -> B -> D -> E -> C
    expect(result.visited).toEqual(['A', 'B', 'D', 'E', 'C']);
  });
});
