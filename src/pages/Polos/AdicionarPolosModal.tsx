import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdicionarPolosModalProps {
  open: boolean;
  onClose: () => void;
}

const AdicionarPolosModal: React.FC<AdicionarPolosModalProps> = ({ open, onClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [erroNome, setErroNome] = useState(false);
  const [erroDescricao, setErroDescricao] = useState(false);

  const handleSave = async () => {
    const urlServidor = localStorage.getItem('urlServidor');
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }

    const novoPolos = {
      nome,
      descricao,
    };

    try {
      await axios.post(`${urlServidor}/polos`, novoPolos, { headers });
      toast.success('Polo adicionado com sucesso!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const response = error.response.data;

        resetErrors();

        if (response.titulo && response.mensagem) {
          toast.error(`${response.titulo}: ${response.mensagem}`, { autoClose: false });
        } else if (response.campos) {
          response.campos.forEach((campo: any) => {
            toast.error(campo.nome ? `${campo.nome}: ${campo.mensagem}` : campo.mensagem, { autoClose: false });
            setError(campo.nome);
          });
        }
      } else {
        console.error("Erro desconhecido", error);
      }
    }
  };

  const resetErrors = () => {
    setErroNome(false);
    setErroDescricao(false);
  };

  const setError = (field: string) => {
    switch (field) {
      case 'nome':
        setErroNome(true);
        break;
      case 'descricao':
        setErroDescricao(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!open) {
      // Resetar campos ao fechar o modal
      setNome('');
      setDescricao('');
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <>
      <ToastContainer />
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Adicionar Polo
        </Typography>
        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            cursor: "pointer",
          }}
        >
          <XCircle color="#45674C" weight="fill" size={26} />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={erroNome}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: erroNome ? 'red' : 'default',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              error={erroDescricao}
              multiline rows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: erroDescricao ? 'red' : 'default',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" sx={{ backgroundColor: '#45674C', color: 'white', mr: 1, fontWeight: 'bold'}} onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
      </>
    </Modal>
  );
};

export default AdicionarPolosModal;

