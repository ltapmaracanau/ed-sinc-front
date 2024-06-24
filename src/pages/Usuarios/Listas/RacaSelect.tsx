import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface RacaSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const racaOptions = ["Branca", "Parda", "Preta", "Amarela", "Indígena"];

const RacaSelect: React.FC<RacaSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Raça</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="Raça"
      >
        {racaOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RacaSelect;
