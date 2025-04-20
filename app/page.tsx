'use client';

import { Box, Button, Typography } from '@mui/material';
// Тип одного сегмента маршрута
interface Segment {
  from: string;
  to: string;
  minutes: number;
  wagonsTip: string;
}

// Тип всего ответа от /api/route
interface RouteResult {
  total: number;
  segments: Segment[];
}

import { useState } from 'react';
import { StationSelect, type Station } from './components/StationSelect';

export default function Home() {
  const [from, setFrom] = useState<Station | null>(null);
  const [to,   setTo]   = useState<Station | null>(null);
  // хранит полученный от API результат или null, если ещё не запрошен
const [route,   setRoute]   = useState<RouteResult | null>(null);
// индикатор, что запрос в процессе
const [loading, setLoading] = useState(false);
const handleClick = async () => {
  // 1. Не даём нажать, если нет from/to
  if (!from || !to) return;

  // 2. Включаем индикатор загрузки
  setLoading(true);

  try {
    // 3. Делаем POST-запрос в наше API
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from.id, to: to.id }),
    });

    // 4. Парсим JSON-ответ
    const data: RouteResult = await res.json();

    // 5. Сохраняем результат в стейт
    setRoute(data);
  } catch (e) {
    console.error('Ошибка при fetch /api/route:', e);
  } finally {
    // 6. Выключаем индикатор загрузки
    setLoading(false);
  }
};


  const handleClick = () => {
    if (!from || !to) return;
    // здесь отправляем запрос: { from: from.id, to: to.id }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>Маршрут метро</Typography>

      <StationSelect
        label="Откуда"
        value={from}
        onChange={setFrom}
      />
      <StationSelect
        label="Куда"
        value={to}
        onChange={setTo}
      />

      <Button
  variant="contained"
  fullWidth
  sx={{ mt: 2 }}
  onClick={handleClick}                // вызываем нашу функцию
  disabled={!from || !to || loading}    // блокируем, если нет from/to или идёт запрос
>
  {loading ? 'Секундочку…' : 'Построить'} // меняем текст во время загрузки
</Button>
{/* Если route не null, показываем результат */}
{route && (
  <Box mt={4}>
    {/* Общее время */}
    <Typography variant="subtitle1">
      Время: {route.total} мин
    </Typography>

    {/* По одному элементу каждого сегмента */}
    {route.segments.map((seg, i) => (
      <Typography key={i} variant="body2">
        {seg.from} → {seg.to} ({seg.minutes} мин). Садитесь: {seg.wagonsTip}
      </Typography>
    ))}
  </Box>
)}

    </Box>
  );
}
