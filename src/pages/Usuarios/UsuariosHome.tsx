import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import AppBarResponsivel from "../../components/AppBarResponsivel";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import AdicionarUsuarioModal from './AdicionarUsuarioModal';
import EditarUsuarioModal from './EditarUsuarioModal';

export interface UsuarioInterface {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  categorias: string[];
  status: string;
  dataNascimento: number[];
  exportado: boolean;
  raca: string;
  gruposSociais: any[];
  pessoasComDeficiencia: any[];
  pessoasNeurodivergente: any[];
  polos: any[];
}

const headCells = [
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'categorias', numeric: false, disablePadding: false, label: 'Categorias' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'exportado', numeric: false, disablePadding: false, label: 'Exportado' },
  { id: 'acoes', numeric: false, disablePadding: false, label: 'Ações' },
];

function UsuariosHome() {
  const [usuarios, setUsuarios] = useState<UsuarioInterface[]>([]);
  const [tamanho, setTamanho] = useState(5);
  const urlServidor = localStorage.getItem('urlServidor');
  const token = localStorage.getItem('token');
  const [loadingHome, setLoadingHome] = useState(true);
  const [categoria, setCategoria] = useState<string>("");
  const [totalPaginas, setTotalPaginas] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [pagina, setPagina] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);
  const [idUsuario, setIdUsuario] = useState<number>(1);
  const [exportado, setExportado] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditarOpen, setModalEditarOpen] = useState<boolean>(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState<UsuarioInterface | null>(null);

  const [consulta, setConsulta] = useState<{ nome: string, email: string }>({ nome: "", email: "" });

  const { nome, email } = consulta;

  useEffect(() => {
    loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
  }, [consulta, pagina, tamanho, status, categoria, exportado]);

  function handleInputConsultaChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setConsulta({ ...consulta, [name]: value });
    setPagina(0);
  }

  const loadUsuarios = async (consulta: { nome: string, email: string }, pagina: number, tamanho: number, status: string, categoria: string, exportado: string) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    setloading(true);
    
    const queryParams = new URLSearchParams({
      nome: consulta.nome,
      email: consulta.email,
      page: pagina.toString(),
      size: tamanho.toString(),
      status: status || '',
      categoria: categoria || '',
      exportado: exportado || ''
    });

    const url = `${urlServidor}/usuarios/consultar?${queryParams.toString()}`;
    
    try {
      const response = await axios.get(url, { headers });
      setUsuarios(response.data.content); // Atualiza a lista de usuários
      setTotalPaginas(response.data.totalPages);
      setTotalElements(response.data.totalElements); // Atualiza o número total de elementos
      setLoadingHome(false);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  const excluirUsuario = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/${id}`;
    try {
      await axios.delete(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const arquivarUsuario = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/arquivar/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const bloquearUsuario = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/bloquear/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const restaurarUsuario = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/restaurar/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setTamanho(newSize);
    setPagina(0);
  };

  const handleCategoriaChange = (event: SelectChangeEvent<string>) => {
    setCategoria(event.target.value as string);
    setPagina(0);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
    setPagina(0);
  };

  const handleExportadoChange = (event: SelectChangeEvent<string>) => {
    setExportado(event.target.value as string);
    setPagina(0);
  };

  const [consultaStatus, setConsultaStatus] = useState<boolean>(true);
  const [isArquivados, setIsArquivados] = useState<boolean>(false);
  const comutaStatus = () => {
    consultaStatus
      ? [setIsArquivados(!isArquivados), setStatus("Arquivado"), setPagina(0), setConsultaStatus(false),
        loadUsuarios(consulta, 0, tamanho, "Arquivado", categoria, exportado)]
      : [setIsArquivados(!isArquivados), setStatus("Ativo"), setPagina(0), setConsultaStatus(true),
        loadUsuarios(consulta, 0, tamanho, "Ativo", categoria, exportado)];
  };

  const [isDialogoExcluirModalOpen, setDialogoExcluirModalState] = useState<boolean>(false);
  const toggleDialogoExcluirModal = () => setDialogoExcluirModalState(!isDialogoExcluirModalOpen);
  const updateOnSubmitModalDialogoExcluir = () => {
    excluirUsuario(idUsuario);
    setDialogoExcluirModalState(!isDialogoExcluirModalOpen);
  };

  const onClickModalDialogoExcluir = (id: number) => {
    toggleDialogoExcluirModal();
    setIdUsuario(id);
  };

  const handleEditClick = (usuario: UsuarioInterface) => {
    setUsuarioParaEditar(usuario);
    setModalEditarOpen(true);
  };

  const [dense, setDense] = useState<boolean>(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inativo':
        return 'default';
      case 'Ativo':
        return 'primary';
      case 'Bloqueado':
        return 'secondary';
      case 'Arquivado':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Inativo':
        return 'Inativo';
      case 'Ativo':
        return 'Ativo';
      case 'Arquivado':
        return 'Arquivado';
      case 'Bloqueado':
        return 'Bloqueado';
      default:
        return 'Desconhecido';
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCloseModalAndUpdate = () => {
    handleCloseModal();
    loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
  };

  const handleCloseEditModalAndUpdate = () => {
    setModalEditarOpen(false);
    loadUsuarios(consulta, pagina, tamanho, status, categoria, exportado);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBarResponsivel />
      {!loadingHome ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Pesquisar por nome"
                  variant="outlined"
                  fullWidth
                  value={consulta.nome}
                  onChange={handleInputConsultaChange}
                  name="nome"
                  inputProps={{ style: { textOverflow: 'ellipsis' } }} // Adicionando overflow para o campo nome
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pesquisar por email"
                  variant="outlined"
                  fullWidth
                  value={consulta.email}
                  onChange={handleInputConsultaChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Exportado</InputLabel>
                  <Select
                    value={exportado}
                    onChange={handleExportadoChange}
                    label="Exportado"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value="false">Não</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={categoria}
                    onChange={handleCategoriaChange}
                    label="Categoria"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Aluno">Aluno</MenuItem>
                    <MenuItem value="Mentor">Mentor</MenuItem>
                    <MenuItem value="Coordenador">Coordenador</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Arquivado">Arquivado</MenuItem>
                    <MenuItem value="Bloqueado">Bloqueado</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={usuario.id}
                    sx={{ cursor: 'default' }}
                  >
                    <TableCell>
                      {usuario.email}
                    </TableCell>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.categorias.join(', ')}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(usuario.status)}
                        color={getStatusColor(usuario.status)}
                        sx={{ borderColor: 'green', borderWidth: '1px', borderStyle: 'solid', color: 'green' }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{usuario.exportado ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>
                      <Tooltip title="Bloquear">
                        <IconButton
                          onClick={() => bloquearUsuario(usuario.id)}
                          sx={{ color: '#FFC107', border: '1px solid #FFC107', borderRadius: '50%', marginRight: '8px' }}
                        >
                          <BlockIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Arquivar">
                        <IconButton
                          onClick={() => arquivarUsuario(usuario.id)}
                          sx={{ color: '#F44336', border: '1px solid #F44336', borderRadius: '50%', marginRight: '8px' }}
                        >
                          <ArchiveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Restaurar">
                        <IconButton
                          onClick={() => restaurarUsuario(usuario.id)}
                          sx={{ color: 'green', border: '1px solid green', borderRadius: '50%', marginRight: '8px' }}
                        >
                          <RestoreIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() => handleEditClick(usuario)}
                          sx={{ color: '#2196F3', border: '1px solid #2196F3', borderRadius: '50%', marginRight: '8px' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={totalElements}
              rowsPerPage={tamanho}
              page={pagina}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Paper> 
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={['green', 'gray', 'green', 'black', 'green']}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 1 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#45674C', color: 'white', fontWeight: 'bold' }}
          onClick={handleOpenModal}
        >
          Adicionar
        </Button>
      </Box>
      <AdicionarUsuarioModal open={modalOpen} onClose={handleCloseModalAndUpdate} />
      <EditarUsuarioModal open={modalEditarOpen} onClose={handleCloseEditModalAndUpdate} usuario={usuarioParaEditar} />
    </Box>
  );
}

export default UsuariosHome;
