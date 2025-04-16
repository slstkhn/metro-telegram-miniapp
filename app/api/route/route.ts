import { NextRequest, NextResponse } from 'next/server';
import data from '../../../data/metro.json';
import { dijkstra } from '../../../../lib/dijkstra';

export async function POST(request: NextRequest) {
  const { from, to } = await request.json();
  if (!from || !to) {
    return NextResponse.json({ error: 'from/to required' }, { status: 400 });
  }

  // Build graph from data
  const graph: Record<string, { to: string; minutes: number }[]> = {};
  (data.edges as any[]).forEach((e) => {
    (graph[e.from] = graph[e.from] || []).push({ to: e.to, minutes: e.minutes });
    (graph[e.to] = graph[e.to] || []).push({ to: e.from, minutes: e.minutes });
  });

  const { dist, path } = dijkstra(graph, from, to);

  // Build segments info
  const segments = [];
  for (let i = 0; i < path.length - 1; i++) {
    const sFrom: any = data.stations.find((s: any) => s.id === path[i]);
    const sTo: any = data.stations.find((s: any) => s.id === path[i + 1]);
    const minutes = graph[sFrom.id].find((e) => e.to === sTo.id)!.minutes;
    const wagon = (data.wagons as any[]).find((w) => w.station === sFrom.id) || { best_car: '?' };
    segments.push({
      from: sFrom.name,
      to: sTo.name,
      minutes,
      wagonsTip: wagon.best_car
    });
  }

  return NextResponse.json({ total: dist, segments });
}
