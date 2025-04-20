'use client';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { StationSelect, Station } from './components/StationSelect';

export default function Home() {
  // 1. Состояния для селектов и времени
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [time, setTime] = useState<number | null>(null);

  // 2. handleClick с fetch и setTime
  const handleClick = async () => {
    if (!from || !to) return;
    const res = await fetch('/api/route', {
      method: 'POST',
      body: JSON.stringify({ from: from.id, to: to.id }),
    });
    const json = await res.json();
    setTime(json.total);
    console.log('API ответ:', json);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Маршрут метро
      </Typography>

      {/* 3. Передаём и value, и onChange */}
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
      >
        Построить
      </Button>

      {/* 4. Выводим время */}
      <Typography sx={{ mt: 2 }}>
        Время: {time !== null ? `${time} мин` : '—'}
      </Typography>
    </Box>
  );
}
