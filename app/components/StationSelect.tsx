'use client';

import { Autocomplete, TextField } from '@mui/material'
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

import { useEffect, useState } from 'react'

/** Хук для загрузки списка станций из public/metro.json */
function useStations() {
  const [stations, setStations] = useState<{ id: string; name: string; line?: string }[]>([])
  useEffect(() => {
    fetch('/metro.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load metro.json')
        return res.json()
      })
      .then(data => setStations(data.stations))
      .catch(console.error)
  }, [])
  return stations
}

export interface Station {
  id: string
  name: string
  line?: string
}


interface Props {
  label: string
  value: Station | null
  onChange: (val: Station | null) => void
}

/** Компонент выбора станции с автокомплитом */
export function StationSelect({ label, value, onChange }: Props) {
  const stations = useStations()

  return (
    <Autocomplete
      fullWidth
      options={stations}
      getOptionLabel={opt => opt.name}
      value={value}
      onChange={(_, val) => onChange(val)}
      isOptionEqualToValue={(opt, val) => opt.id === val?.id}
      renderInput={params => (
        <TextField
          {...params}
          label={stations.length === 0 ? 'Загрузка...' : label}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  )
}
