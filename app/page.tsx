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
        onClick={handleClick}
        disabled={!from || !to}
      >
        Построить
      </Button>
    </Box>
  );
}
