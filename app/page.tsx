'use client';

import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { StationSelect } from './components/StationSelect';
import type { Station } from './components/StationSelect';

export default function Home() {
  // 1. Состояния для селектов и времени
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [segments, setSegments] = useState<
    { from: string; to: string; minutes: number; wagonsTip: string }[]
  >([]);

  // 2. handleClick с fetch и setTime/ setSegments
  const handleClick = async () => {
    if (!from || !to) return;
    const res = await fetch(`/api/route?from=${from.id}&to=${to.id}`);
    if (!res.ok) {
      console.error('Ошибка при получении маршрута');
      return;
    }
    const json = await res.json();
    setTime(json.total);
    setSegments(json.segments);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Маршрут метро
      </Typography>

      {/* 3. Передаём и value, и onChange */}
      <StationSelect label="Откуда" value={from} onChange={setFrom} />
      <StationSelect label="Куда"   value={to}   onChange={setTo}   />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleClick}
        disabled={!from || !to}  // не даём нажать без выбора
      >
        Построить
      </Button>

      {/* 4. Выводим время */}
      <Typography sx={{ mt: 2 }}>
        Время: {time !== null ? `${time} мин` : '—'}
      </Typography>

      {/* 5. Выводим список сегментов с подсказками по вагонам */}
      {segments.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {segments.map((seg, i) => (
            <Typography key={i} variant="body2">
              {seg.from} → {seg.to}: {seg.minutes} мин; 🡆 вагон: «{seg.wagonsTip}»
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
