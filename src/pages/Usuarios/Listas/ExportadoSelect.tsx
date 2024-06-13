import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface ExportadoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const exportadoOptions = ["Sim", "Não"];

const ExportadoSelect: React.FC<ExportadoSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Exportado</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="Exportado"
      >
        {exportadoOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ExportadoSelect;
