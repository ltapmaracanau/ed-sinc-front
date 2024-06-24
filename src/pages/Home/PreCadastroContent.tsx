import React, { useState, useEffect } from 'react';
import AppBarResponsivel from '../../components/AppBarResponsivel';
import { PainelContainer } from '../../components/PainelContainer';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GruposSociaisSelect from '../GruposSociais/GruposSociaisSelect';
import PolosSelect from '../Polos/PolosSelect';
import PessoaComDeficienciaSelect from '../PessoaComDeficiencia/PessoaComDeficienciaSelect';
import PessoaNeurodivergenteSelect from '../PessoaNeurodivergente/PessoaNeurodivergenteSelect';
import RacaSelect from '../Usuarios/Listas/RacaSelect';

const aplicarMascaraTelefone = (valor: string) => {
  return valor
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/^(\d{2})(\d)/g, '($1) $2') // Adiciona parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona um hífen antes dos últimos quatro dígitos
};

const aplicarMascaraCpf = (valor: string) => {
  return valor
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona ponto e hífen
};

const PreCadastroContent: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [selectedGruposSociais, setSelectedGruposSociais] = useState<string[]>([]);
  const [selectedPessoaComDeficiencia, setSelectedPessoaComDeficiencia] = useState<string[]>([]);
  const [selectedPessoaNeurodivergente, setSelectedPessoaNeurodivergente] = useState<string[]>([]);
  const [selectedPolos, setSelectedPolos] = useState<string[]>([]);
  const [raca, setRaca] = useState('Pardo');

  const [erroNome, setErroNome] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroConfirmarEmail, setErroConfirmarEmail] = useState(false);
  const [erroTelefone, setErroTelefone] = useState(false);
  const [erroCpf, setErroCpf] = useState(false);
  const [erroData, setErroData] = useState(false);

  const handleSave = async () => {
    const urlServidor = localStorage.getItem('urlServidor');
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

    const telefoneSemMascara = telefone.replace(/[()\s-]/g, '');
    const cpfSemMascara = cpf.replace(/[.\-]/g, '');

    const gruposSociais = selectedGruposSociais.map(id => ({ id: parseInt(id) }));
    const polos = selectedPolos.map(id => ({ id: parseInt(id) }));
    const pessoasNeurodivergente = selectedPessoaNeurodivergente.map(id => ({ id: parseInt(id) }));
    const pessoasComDeficiencia = selectedPessoaComDeficiencia.map(id => ({ id: parseInt(id) }));

    const novoUsuario = {
      nome,
      emailEConfirmarEmail: {
        email,
        confirmarEmail
      },
      cpf: cpfSemMascara,
      telefone: telefoneSemMascara,
      dataNascimento,
      gruposSociais,
      polos,
      pessoasNeurodivergente,
      pessoasComDeficiencia,
      raca
    };

    try {
      await axios.post(`${urlServidor}/auth/precadastro`, novoUsuario, { headers });
      toast.success('Pré-cadastro realizado com sucesso!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const campos = error.response.data.campos;

        // Resetar todos os erros
        setErroNome(false);
        setErroEmail(false);
        setErroConfirmarEmail(false);
        setErroTelefone(false);
        setErroCpf(false);
        setErroData(false);

        campos.forEach((campo: any) => {
          toast.error(campo.nome ? `${campo.nome}: ${campo.mensagem}` : campo.mensagem, { autoClose: false });
          switch (campo.nome) {
            case 'nome':
              setErroNome(true);
              break;
            case 'email':
              setErroEmail(true);
              break;
            case 'confirmarEmail':
              setErroConfirmarEmail(true);
              break;
            case 'telefone':
              setErroTelefone(true);
              break;
            case 'cpf':
              setErroCpf(true);
              break;
            case 'dataNascimento':
              setErroData(true);
              break;
            default:
              break;
          }
        });
      } else {
        console.error("Erro desconhecido", error);
      }
    }
  };

  const handleGruposSociaisChange = (value: string[]) => {
    setSelectedGruposSociais(value);
  };

  const handlePolosChange = (value: string[]) => {
    setSelectedPolos(value);
  };

  const handlePessoaNeurodivergenteChange = (value: string[]) => {
    setSelectedPessoaNeurodivergente(value);
  };

  const handlePessoaComDeficienciaChange = (value: string[]) => {
    setSelectedPessoaComDeficiencia(value);
  };

  const handleRacaChange = (value: string) => {
    setRaca(value);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.replace(/\D/g, '').length <= 11) {
      setTelefone(aplicarMascaraTelefone(valor));
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.replace(/\D/g, '').length <= 11) {
      setCpf(aplicarMascaraCpf(valor));
    }
  };

  return (
    <PainelContainer>
      <AppBarResponsivel/>
      <Container maxWidth="md">
        <ToastContainer />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Pré-Cadastro
          </Typography>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={erroEmail}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: erroEmail ? 'red' : 'default',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Confirmar Email"
                value={confirmarEmail}
                onChange={(e) => setConfirmarEmail(e.target.value)}
                error={erroConfirmarEmail}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: erroConfirmarEmail ? 'red' : 'default',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Telefone"
                value={telefone}
                onChange={handleTelefoneChange}
                variant="outlined"
                error={erroTelefone}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: erroTelefone ? 'red' : 'default',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="CPF"
                value={cpf}
                onChange={handleCpfChange}
                variant="outlined"
                error={erroCpf}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: erroCpf ? 'red' : 'default',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                error={erroData}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: erroData ? 'red' : 'default',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <RacaSelect
                value={raca}
                onChange={handleRacaChange}
              />
            </Grid>
            <Grid item xs={6}>
              <GruposSociaisSelect
                value={selectedGruposSociais}
                onChange={handleGruposSociaisChange}
              />
            </Grid>
            <Grid item xs={6}>
              <PolosSelect
                value={selectedPolos}
                onChange={handlePolosChange}
              />
            </Grid>
            <Grid item xs={6}>
              <PessoaComDeficienciaSelect
                value={selectedPessoaComDeficiencia}
                onChange={handlePessoaComDeficienciaChange}
              />
            </Grid>
            <Grid item xs={6}>
              <PessoaNeurodivergenteSelect
                value={selectedPessoaNeurodivergente}
                onChange={handlePessoaNeurodivergenteChange}
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#45674C', color: 'white', mr: 1, fontWeight: 'bold'}}
              onClick={handleSave}
            >
              Realizar Pré-Cadastro
            </Button>
          </Box>
        </Box>
      </Container>
    </PainelContainer>
  );
};

export default PreCadastroContent;
