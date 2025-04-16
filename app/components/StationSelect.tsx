'use client';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import stationsData from '../../data/metro.json';

interface Props {
  label: string;
  onChange: (value: any) => void;
}

export default function StationSelect({ label, onChange }: Props) {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    setOptions((stationsData as any).stations);
  }, []);

  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(opt) => opt.name}
      onChange={(e, val) => onChange(val)}
      renderInput={(params) => <TextField {...params} label={label} margin="normal" />}
    />
  );
}
