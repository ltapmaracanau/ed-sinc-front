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
import AdicionarPolosModal from './AdicionarPolosModal';
import EditarPolosModal from './EditarPolosModal';

export interface PolosInterface {
  id: number;
  nome: string;
  descricao: string;
  status: string;
}


const headCells = [
  { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'acoes', numeric: false, disablePadding: false, label: 'Ações' },
];


function PolosHome() {
  const [poloss, setPoloss] = useState<PolosInterface[]>([]);
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
  const [idPolos, setIdPolos] = useState<number>(1);
  const [exportado, setExportado] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditarOpen, setModalEditarOpen] = useState<boolean>(false);
  const [polosParaEditar, setPolosParaEditar] = useState<PolosInterface | null>(null);

  const [consulta, setConsulta] = useState<{ nome: string }>({ nome: "" });

  const { nome } = consulta;

  useEffect(() => {
    loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
  }, [consulta, pagina, tamanho, status, categoria, exportado]);

  function handleInputConsultaChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setConsulta({ ...consulta, [name]: value });
    setPagina(0);
  }

  const loadPoloss = async (consulta: { nome: string }, pagina: number, tamanho: number, status: string, categoria: string, exportado: string) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    setloading(true);

    const queryParams = new URLSearchParams({
      nome: consulta.nome,
      page: pagina.toString(),
      size: tamanho.toString(),
      status: status || '',
      categoria: categoria || '',
      exportado: exportado || ''
    });

    const url = `${urlServidor}/polos/consultar?${queryParams.toString()}`;

    try {
      const response = await axios.get(url, { headers });
      setPoloss(response.data.content);
      setTotalPaginas(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setLoadingHome(false);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  const excluirPolos = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/polos/${id}`;
    try {
      await axios.delete(url, { headers });
      loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const arquivarPolos = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/polos/arquivar/${id}`;
    try {
      await axios.get(url, { headers });
      loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const bloquearPolos = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/polos/bloquear/${id}`;
    try {
      await axios.get(url, { headers });
      loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
    } catch (error) {
      console.error(error);
    }
  };

  const restaurarPolos = async (id: number) => {
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${urlServidor}/polos/restaurar/${id}`;
    try {
      await axios.get(url, { headers });
      loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
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

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
    setPagina(0);
  };

  const [isDialogoExcluirModalOpen, setDialogoExcluirModalState] = useState<boolean>(false);
  const toggleDialogoExcluirModal = () => setDialogoExcluirModalState(!isDialogoExcluirModalOpen);

  const handleEditClick = (polos: PolosInterface) => {
    setPolosParaEditar(polos);
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
    loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
  };

  const handleCloseEditModalAndUpdate = () => {
    setModalEditarOpen(false);
    loadPoloss(consulta, pagina, tamanho, status, categoria, exportado);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBarResponsivel />
      {!loadingHome ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  label="Pesquisar por nome"
                  variant="outlined"
                  fullWidth
                  value={consulta.nome}
                  onChange={handleInputConsultaChange}
                  name="nome"
                  inputProps={{ style: { textOverflow: 'ellipsis' } }}
                />
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
                {poloss.map((polos, index) => {
                  return (
                    <TableRow
                      hover
                      role="default"
                      tabIndex={-1}
                      key={polos.id}
                      sx={{ cursor: 'default' }} 
                    >
                      <TableCell>{polos.nome}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(polos.status)}
                          color={getStatusColor(polos.status)}
                          sx={{ borderColor: 'green', borderWidth: '1px', borderStyle: 'solid', color: 'green' }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Bloquear">
                          <IconButton
                            onClick={() => bloquearPolos(polos.id)}
                            sx={{ color: '#FFC107', border: '1px solid #FFC107', borderRadius: '50%', marginRight: '8px' }}
                          >
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Arquivar">
                          <IconButton
                            onClick={() => arquivarPolos(polos.id)}
                            sx={{ color: '#F44336', border: '1px solid #F44336', borderRadius: '50%', marginRight: '8px' }}
                          >
                            <ArchiveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Restaurar">
                          <IconButton
                            onClick={() => restaurarPolos(polos.id)}
                            sx={{ color: 'green', border: '1px solid green', borderRadius: '50%', marginRight: '8px' }}
                          >
                            <RestoreIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            onClick={() => handleEditClick(polos)}
                            sx={{ color: '#2196F3', border: '1px solid #2196F3', borderRadius: '50%', marginRight: '8px' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
      <AdicionarPolosModal open={modalOpen} onClose={handleCloseModalAndUpdate} />
      <EditarPolosModal open={modalEditarOpen} onClose={handleCloseEditModalAndUpdate} polos={polosParaEditar} />
    </Box>
  );
}

export default PolosHome;
