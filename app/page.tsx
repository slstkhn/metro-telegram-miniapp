'use client';
import { Box, Button, Typography } from '@mui/material';
import StationSelect from './components/StationSelect';
import { useState } from 'react';

export default function Home() {
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {
    if (!from || !to) return;
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from.id, to: to.id })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>Маршрут метро</Typography>
      <StationSelect label="Откуда" onChange={setFrom} />
      <StationSelect label="Куда" onChange={setTo} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleClick}>
        Построить
      </Button>
      {result && (
        <Box mt={4}>
          <Typography>Время: {result.total} мин</Typography>
          {result.segments.map((seg: any, i: number) => (
            <Typography key={i}>
              {seg.from} → {seg.to} ({seg.minutes} мин). Садитесь в {seg.wagonsTip}.
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
