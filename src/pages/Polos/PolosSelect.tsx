import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { PolosInterface } from './PolosHome';

interface SelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const PolosSelect: React.FC<SelectProps> = ({ value, onChange }) => {
  const [grupos, setGrupos] = useState<PolosInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const urlServidor = localStorage.getItem('urlServidor');

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${urlServidor}/polos/consultar?nome=&status=Ativo`);
        setGrupos(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar:', error);
        setLoading(false);
      }
    };

    fetchGrupos();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(event.target.value as string[]);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const getSelectedGroupNames = (selectedIds: string[]) => {
    return selectedIds.map(id => {
      const grupo = grupos.find(grupo => grupo.id.toString() === id);
      return grupo ? grupo.nome : '';
    }).join(', ');
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Polos</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Polos" />}
        renderValue={(selected) => getSelectedGroupNames(selected as string[])}
      >
        {grupos.map((grupo) => (
          <MenuItem key={grupo.id} value={grupo.id.toString()}>
            <Checkbox checked={value.indexOf(grupo.id.toString()) > -1} />
            <ListItemText primary={grupo.nome} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PolosSelect;