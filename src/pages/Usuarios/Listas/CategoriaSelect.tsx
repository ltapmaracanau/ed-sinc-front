import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';

interface CategoriaSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const categorias = ["Aluno", "Mentor", "Coordenador", "Administrador"];

const CategoriaSelect: React.FC<CategoriaSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Categorias</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Categorias" />}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {categorias.map((categoria) => (
          <MenuItem key={categoria} value={categoria}>
            <Checkbox checked={value.indexOf(categoria) > -1} />
            <ListItemText primary={categoria} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoriaSelect;
