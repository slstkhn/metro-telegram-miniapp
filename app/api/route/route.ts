import { NextRequest, NextResponse } from 'next/server';
import { dijkstra } from '../../../lib/dijkstra';

export async function POST(req: NextRequest) {
  const { from, to } = await req.json();
  if (!from || !to) {
    return NextResponse.json({ error: 'from/to required' }, { status: 400 });
  }

  // Подхватываем свежий public/metro.json
  const origin = req.nextUrl.origin;
  const data = await fetch(`${origin}/metro.json`).then(res => res.json());

  // Собираем граф
  const graph: Record<string, { to: string; minutes: number }[]> = {};
  (data.edges as any[]).forEach(e => {
    graph[e.from] = graph[e.from] || [];
    graph[e.from].push({ to: e.to, minutes: e.minutes });
    graph[e.to]   = graph[e.to]   || [];
    graph[e.to].push({ to: e.from, minutes: e.minutes });
  });

  const { dist, path } = dijkstra(graph, from, to);

  const segments = [];
  for (let i = 0; i < path.length - 1; i++) {
    const sFrom = data.stations.find((s:any) => s.id === path[i]);
    const sTo   = data.stations.find((s:any) => s.id === path[i+1]);
    const minutes = graph[path[i]].find(e => e.to === path[i+1])!.minutes;
    const wagon = (data.wagons as any[]).find(w => w.station === path[i])?.best_car || '';
    segments.push({ from: sFrom.name, to: sTo.name, minutes, wagonsTip: wagon });
  }

  return NextResponse.json({ total: dist[to], segments });
}
