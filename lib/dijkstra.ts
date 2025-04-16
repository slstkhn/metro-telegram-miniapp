export interface Edge {
  to: string;
  minutes: number;
}

export type Graph = Record<string, Edge[]>;

interface Result {
  dist: number;
  path: string[];
}

export function dijkstra(graph: Graph, start: string, end: string): Result {
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited: Set<string> = new Set();

  Object.keys(graph).forEach(v => { dist[v] = Infinity; prev[v] = null; });
  dist[start] = 0;

  while (true) {
    let u: string | null = null;
    Object.keys(graph).forEach(v => {
      if (!visited.has(v) && (u === null || dist[v] < dist[u])) {
        u = v;
      }
    });
    if (u === null || u === end) break;

    visited.add(u);
    graph[u].forEach(edge => {
      const alt = dist[u!] + edge.minutes;
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = u;
      }
    });
  }

  const path: string[] = [];
  let u: string | null = end;
  while (u) {
    path.unshift(u);
    u = prev[u];
  }
  return { dist: dist[end], path };
}
