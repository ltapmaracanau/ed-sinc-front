import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const statusOptions = ["Ativo", "Arquivado", "Bloqueado", "Inativo"];

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Status</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="Status"
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
