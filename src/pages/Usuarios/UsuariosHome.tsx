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
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import BlockIcon from '@mui/icons-material/Block';

interface UsuarioInterface {
  id: number;
  nome: string;
  email: string;
  categorias: number[];
  accountNonLocked: boolean;
  status: number;
  dataNascimento: any;
  exportado: boolean;
}

const headCells = [
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'categorias', numeric: false, disablePadding: false, label: 'Categorias' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'exportado', numeric: false, disablePadding: false, label: 'Exportado' },
  { id: 'acoes', numeric: false, disablePadding: false, label: 'Ações' },
];

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }),
    }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Usuários
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function UsuariosHome() {
  const [usuarios, setUsuarios] = useState<UsuarioInterface[]>([]);
  const [tamanho, setTamanho] = useState(5);
  const urlServidor = localStorage.getItem('urlServidor');
  const token = localStorage.getItem('token');
  const [loadingHome, setLoadingHome] = useState(true);
  const [categoria, setCategoria] = useState("");
  const [totalPaginas, setTotalPaginas] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [status, setStatus] = useState("Ativo");
  const [pagina, setPagina] = useState(0);
  const [loading, setloading] = useState<boolean>(false);
  const [idUsuario, setIdUsuario] = useState<number>(1);

  const [consulta, setConsulta] = useState({ nome: "", email: "" });

  const { nome, email } = consulta;

  useEffect(() => {
    loadUsuarios(consulta, pagina, tamanho, status, categoria);
  }, [consulta, pagina, tamanho, status, categoria]);

  function handleInputConsultaChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setConsulta({ ...consulta, [name]: value });
    setPagina(0);
  }

  const loadUsuarios = async (consulta: any, pagina: number, tamanho: number, status: string, categoriaData: string) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    setloading(true);
    const url = `${urlServidor}/usuarios/consultar?nome=${consulta.nome}&email=${consulta.email}&page=${pagina}&size=${tamanho}&status=${status}`;
    console.log(url);
    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
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

  const excluirUsuario = async (id: any) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/${id}`;
    try {
      await axios.delete(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria);
    } catch (error) {
      console.error(error);
    }
  };

  const arquivarUsuario = async (id: any) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/arquivar/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria);
    } catch (error) {
      console.error(error);
    }
  };

  const bloquearUsuario = async (id: any) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/bloquear/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria);
    } catch (error) {
      console.error(error);
    }
  };

  const restaurarUsuario = async (id: any) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/usuarios/restaurar/${id}`;
    try {
      await axios.get(url, { headers });
      loadUsuarios(consulta, pagina, tamanho, status, categoria);
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

  const getCategoria = (categoriaData?: any) => {
    let categoriaId: string;
    {
      categoriaData ? (categoriaId = categoriaData) : (categoriaId = "");
    }
    setCategoria(categoriaId);
    setPagina(0);
  };

  const [consultaStatus, setConsultaStatus] = useState<boolean>(true);
  const [isArquivados, setIsArquivados] = useState(false);
  const comutaStatus = () => {
    consultaStatus
      ? [setIsArquivados(!isArquivados), setStatus("Arquivado"), setPagina(0), setConsultaStatus(false),
        loadUsuarios(consulta, 0, tamanho, "Arquivado", categoria)]
      : [setIsArquivados(!isArquivados), setStatus("Ativo"), setPagina(0), setConsultaStatus(true),
        loadUsuarios(consulta, 0, tamanho, "Ativo", categoria)];
  };

  const [isDialogoExcluirModalOpen, setDialogoExcluirModalState] = React.useState(false);
  const toggleDialogoExcluirModal = () => setDialogoExcluirModalState(!isDialogoExcluirModalOpen);
  const updateOnSubmitModalDialogoExcluir = () => {
    excluirUsuario(idUsuario);
    setDialogoExcluirModalState(!isDialogoExcluirModalOpen);
  };

  const onClickModalDialogoExcluir = (id: any) => {
    toggleDialogoExcluirModal();
    setIdUsuario(id);
  };

  const [dense, setDense] = useState(true); // Definido como true por padrão
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = usuarios.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

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

  return (
    <Box sx={{ width: '100%' }}>
      <AppBarResponsivel />
      {!loadingHome ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
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
            </Grid>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < usuarios.length}
                      checked={usuarios.length > 0 && selected.length === usuarios.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all users' }}
                    />
                  </TableCell>
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
                {usuarios.map((usuario, index) => {
                  const isItemSelected = isSelected(usuario.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, usuario.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={usuario.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {usuario.email}
                      </TableCell>
                      <TableCell>{usuario.nome}</TableCell>
                      <TableCell>{usuario.categorias.join(', ')}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(usuario.status.toString())}
                          color={getStatusColor(usuario.status.toString())}
                          sx={{ borderColor: 'green', borderWidth: '1px', borderStyle: 'solid', color: 'green' }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{usuario.exportado ? 'Yes' : 'No'}</TableCell>
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
                            sx={{ color: 'green', border: '1px solid green', borderRadius: '50%' }}
                          >
                            <RestoreIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={tamanho}
            page={pagina}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Box>
      )}
    </Box>
  );
}

export default UsuariosHome;
