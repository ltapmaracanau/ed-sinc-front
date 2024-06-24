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
  InputAdornment,
} from '@mui/material';
import { XCircle, Eye, EyeSlash, Lock } from '@phosphor-icons/react';
import CategoriaSelect from './Listas/CategoriaSelect';
import StatusSelect from './Listas/StatusSelect';
import RacaSelect from './Listas/RacaSelect';
import ExportadoSelect from './Listas/ExportadoSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GruposSociaisSelect from '../GruposSociais/GruposSociaisSelect';
import PolosSelect from '../Polos/PolosSelect';
import PessoaComDeficienciaSelect from '../PessoaComDeficiencia/PessoaComDeficienciaSelect';
import PessoaNeurodivergenteSelect from '../PessoaNeurodivergente/PessoaNeurodivergenteSelect';

interface AdicionarUsuarioModalProps {
  open: boolean;
  onClose: () => void;
}

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

const AdicionarUsuarioModal: React.FC<AdicionarUsuarioModalProps> = ({ open, onClose }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senhaEConfirmarSenha, setSenhaEConfirmarSenha] = useState({
    senha: '',
    confirmarSenha: ''
  });
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedGruposSociais, setSelectedGruposSociais] = useState<string[]>([]);
  const [selectedPessoaComDeficiencia, setSelectedPessoaComDeficiencia] = useState<string[]>([]);
  const [selectedPessoaNeurodivergente, setSelectedPessoaNeurodivergente] = useState<string[]>([]);
  const [selectedPolos, setSelectedPolos] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [raca, setRaca] = useState('');
  const [exportado, setExportado] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [erroNome, setErroNome] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroTelefone, setErroTelefone] = useState(false);
  const [erroCpf, setErroCpf] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [erroCategorias, setErroCategorias] = useState(false);

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
      email,
      raca,
      telefone: telefoneSemMascara,
      cpf: cpfSemMascara,
      dataNascimento,
      senhaEConfirmarSenha,
      categorias: selectedCategorias,
      status,
      exportado: exportado === "Sim",
      gruposSociais,
      polos,
      pessoasNeurodivergente,
      pessoasComDeficiencia
    };

    try {
      await axios.post(`${urlServidor}/usuarios`, novoUsuario, { headers });
      toast.success('Usuário adicionado com sucesso!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const campos = error.response.data.campos;

        // Resetar todos os erros
        setErroNome(false);
        setErroEmail(false);
        setErroTelefone(false);
        setErroCpf(false);
        setErroData(false);
        setErroSenha(false);
        setErroCategorias(false);

        campos.forEach((campo: any) => {
          toast.error(campo.nome ? `${campo.nome}: ${campo.mensagem}` : campo.mensagem, { autoClose: false });
          switch (campo.nome) {
            case 'nome':
              setErroNome(true);
              break;
            case 'email':
              setErroEmail(true);
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
            case 'senhaEConfirmarSenha.senha':
            case 'senhaEConfirmarSenha':
              setErroSenha(true);
              break;
            case 'categorias':
              setErroCategorias(true);
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

  const handleCategoriaChange = (value: string[]) => {
    setSelectedCategorias(value);
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

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleRacaChange = (value: string) => {
    setRaca(value);
  };

  const handleExportadoChange = (value: string) => {
    setExportado(value);
  };

  const verSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const verConfirmarSenha = () => {
    setMostrarConfirmarSenha(!mostrarConfirmarSenha);
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

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenhaEConfirmarSenha({ ...senhaEConfirmarSenha, senha: e.target.value });
  };

  const handleConfirmarSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenhaEConfirmarSenha({ ...senhaEConfirmarSenha, confirmarSenha: e.target.value });
  };

  useEffect(() => {
    if (!open) {
      // Resetar campos ao fechar o modal
      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
      setDataNascimento('');
      setSenhaEConfirmarSenha({
        senha: '',
        confirmarSenha: ''
      });
      setSelectedCategorias([]);
      setSelectedGruposSociais([]);
      setSelectedPessoaComDeficiencia([]);
      setSelectedPessoaNeurodivergente([]);
      setSelectedPolos([]);
      setStatus('');
      setRaca('');
      setExportado('');
      setMostrarSenha(false);
      setMostrarConfirmarSenha(false);
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
          Adicionar Usuário
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
            <ExportadoSelect
              value={exportado}
              onChange={handleExportadoChange}
            />
          </Grid>
          <Grid item xs={6}>
            <StatusSelect
              value={status}
              onChange={handleStatusChange}
            />
          </Grid>
          <Grid item xs={6}>
            <RacaSelect
              value={raca}
              onChange={handleRacaChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CategoriaSelect
              value={selectedCategorias}
              onChange={handleCategoriaChange}
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              placeholder="Senha"
              onChange={handleSenhaChange}
              type={mostrarSenha ? "text" : "password"}
              variant="outlined"
              error={erroSenha}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: erroSenha ? 'red' : 'default',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#45674C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={verSenha}
                      edge="end"
                    >
                      {mostrarSenha ? <Eye style={{ color: "#45674C" }} /> : <EyeSlash style={{ color: "#45674C" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginTop: "1rem" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              placeholder="Confirmar Senha"
              onChange={handleConfirmarSenhaChange}
              type={mostrarConfirmarSenha ? "text" : "password"}
              variant="outlined"
              error={erroSenha}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: erroSenha ? 'red' : 'default',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#45674C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={verConfirmarSenha}
                      edge="end"
                    >
                      {mostrarConfirmarSenha ? <Eye style={{ color: "#45674C" }} /> : <EyeSlash style={{ color: "#45674C" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginTop: "1rem" }}
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

export default AdicionarUsuarioModal;
