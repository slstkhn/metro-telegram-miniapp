'use client';

import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { StationSelect, type Station } from './components/StationSelect';

// Тип одного сегмента маршрута
interface Segment {
  from: string;
  to: string;
  minutes: number;
  wagonsTip: string;
}
// Тип всего ответа от API
interface RouteResult {
  total: number;
  segments: Segment[];
}

export default function Home() {
  // состояние для выбора «Откуда»
  const [from, setFrom] = useState<Station | null>(null);
  // состояние для выбора «Куда»
  const [to,   setTo]   = useState<Station | null>(null);

  // результат маршрута
  const [route,   setRoute]   = useState<RouteResult | null>(null);
  // индикатор загрузки
  const [loading, setLoading] = useState(false);

  // Единственная декларация handleClick
  // 1) Убедитесь, что выше объявлен:
//    const [time, setTime] = useState<number | null>(null);

const handleClick = async () => {
  if (!from || !to) return;

  // 2) Ваш запрос к бэку
  const res = await fetch('/api/route', {
    method: 'POST',
    body: JSON.stringify({ from: from.id, to: to.id }),
  });

  // 3) Парсим ответ
  const json = await res.json();

  // ← ВСТАВЬТЕ ЭТУ СТРОКУ ПОДСТРОЧНО:
  setTime(json.total);

  // (опционально) для отладки:
  console.log('total minutes:', json.total, 'segments:', json.segments);
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
        onClick={handleClick}
        disabled={!from || !to || loading}
      >
        {loading ? 'Секундочку…' : 'Построить'}
      </Button>

      {route && (
        <Box mt={4}>
          <Typography variant="subtitle1">
            Время: {route.total} мин
          </Typography>
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
