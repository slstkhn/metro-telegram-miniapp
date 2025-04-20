import { NextRequest, NextResponse } from 'next/server';
import data from '../../../data/metro.json';
import { dijkstra } from '../../../lib/dijkstra';

export async function POST(req: NextRequest) {
  const { from, to } = await req.json();
  if (!from || !to) {
    return NextResponse.json({ error: 'from/to required' }, { status: 400 });
  }

  // 1) Строим граф
  const graph: Record<string, { to: string; minutes: number }[]> = {};
  (data.edges as any[]).forEach(e => {
    graph[e.from] = graph[e.from] || [];
    graph[e.from].push({ to: e.to, minutes: e.minutes });
    graph[e.to]   = graph[e.to]   || [];
    graph[e.to].push({ to: e.from, minutes: e.minutes });
  });

  // 2) Запускаем Dijkstra
  const { dist, path } = dijkstra(graph, from, to);

  // 3) Собираем подробные сегменты
  const segments: {
    from: string;
    to: string;
    minutes: number;
    wagonsTip: string;
  }[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const sFrom = data.stations.find(s => s.id === path[i])!;
    const sTo   = data.stations.find(s => s.id === path[i + 1])!;
    const minutes = graph[path[i]].find(x => x.to === path[i + 1])!.minutes;
    const wagon = (data.wagons as any[])
      .find(w => w.station === sFrom.id)?.best_car || '—';
    segments.push({
      from: sFrom.name,
      to:   sTo.name,
      minutes,
      wagonsTip: wagon,
    });
  }

  // 4) Отдаём ровно то, что ждёт фронт:
  return NextResponse.json({
    total:    dist,      // <— число минут
    segments,            // <— детализация маршрута
  });
}
