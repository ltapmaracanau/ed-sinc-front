import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import edsinclogo from '../assets/ed-sinc-logo.png';
import jwt_decode from "jwt-decode";
import IniciarSessao from "./IniciarSessao";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {
  AddressBook,
  SignOut,
  CaretUp,
  CaretDown,
  Briefcase
} from "@phosphor-icons/react";


function AppBarResponsivel() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElEntidades, setAnchorElEntidades] = React.useState<null | HTMLElement>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [openAdministrativo, setOpenAdministrativo] = useState(false);
  const [openDadosCadastrais, setOpenDadosCadastrais] = React.useState(false);

  const handleClickAdministrativo = () => {
    setOpenAdministrativo(!openAdministrativo);
  };

  const handleClickDadosCadastrais = () => {
    setOpenDadosCadastrais(!openDadosCadastrais);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseEntidadesMenu = () => {
    setAnchorElEntidades(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenEntidadesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEntidades(event.currentTarget);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (anchorElEntidades && !anchorElEntidades.contains(event.target as Node)) {
      handleCloseEntidadesMenu();
    }
  };

  const logoutMenu = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedTokenCategorias = jwt_decode<{ categorias: string[] }>(token);
        console.log(decodedTokenCategorias.categorias);
        setCategorias(decodedTokenCategorias.categorias);
        const decodedTokenNome = jwt_decode<{ nome: string }>(token).nome;
        if (decodedTokenNome) {
          let partes: string[] = decodedTokenNome.split(' ');
          if (partes[0].length >= 10) {
            partes = [partes[0].slice(0, 10), ...partes.slice(1)];
          }
          setNome(partes[0]);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }

    } else {
        console.warn("Token não encontrado no local storage.");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [anchorElEntidades]);

  return (
    <nav role="navigation">
    <AppBar position="static" style={{ backgroundColor: '#45674C' }}>
      <Container maxWidth="xl" sx={{ minHeight: 70,  marginTop: '5px'}}>
        <Toolbar disableGutters>
          <img
            style={{ maxWidth:70 ,cursor: "pointer", marginRight: 20 }}
            src={edsinclogo}
            onClick={() => navigate("/")}
          />
          {/* VERSÃO WEB */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem key={'contato'} onClick={() => {navigate("/contato");}}>
              <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                Contato
              </Typography>
            </MenuItem>
            <MenuItem key={'sobre'} onClick={() => {navigate("/sobre");}}>
              <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                Sobre
              </Typography>
            </MenuItem>
          </Box>

          
        {token!=null && token!=undefined?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${nome}`}>
              <IconButton 
                aria-label="conta do corrente usuário"
                aria-controls="menu usuário"
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElUser)}
                onClick={handleOpenUserMenu} 
                sx={{ p: 0 }}>
                <Avatar alt={nome} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { (
                [
                  <MenuItem key='administrativo' aria-label="Abrir opções administrativo" onClick={handleClickAdministrativo}>
                    <Briefcase/>
                    <Typography textAlign="center" style={{marginLeft:20, marginRight:'auto'}}>
                      Administrativo
                    </Typography>
                    {openAdministrativo ? < CaretUp/> : <CaretDown/>}
                  </MenuItem>,
                  <Collapse in={openAdministrativo} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                          <Typography onClick={() => { navigate("/usuarios");}} textAlign="center">
                            Usuarios
                          </Typography>
                      </ListItemButton>
                    </List>
                  </Collapse>
                ]
              )}
                
                  <MenuItem key='dados' aria-label="Abrir opções dados" onClick={handleClickDadosCadastrais}>
                    <AddressBook/>
                    <Typography textAlign="center" style={{marginLeft:20, marginRight:'auto'}}>
                      Dados Cadastrais
                    </Typography>
                    {openDadosCadastrais ? <CaretUp/> : <CaretDown/>}
                  </MenuItem>
                  <Collapse in={openDadosCadastrais} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <Typography onClick={() => {navigate("/alterarsenha");}} textAlign="center">
                        Senha
                      </Typography>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <Typography onClick={() => {navigate("/alterardadospessoais");}} textAlign="center">
                        Dados Pessoais
                      </Typography>
                    </ListItemButton>
                    </List>
                  </Collapse>
                

                  <MenuItem key='sair' aria-label="Sair do sistema" onClick={logoutMenu}>
                    <SignOut/>
                    <Typography textAlign="center" style={{marginLeft:20}}>
                      Sair
                    </Typography>
                  </MenuItem>

            </Menu>
          </Box>
          : 
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "#45674C",
              width: "7.95rem",
              height: "2.95rem",
              fontSize: "1rem",
              fontVariant: "h5", 
              fontWeight: "600",
              borderRadius: "0.375rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
            }}
            onClick={() => {
              setShowLoginModal(!showLoginModal);
            }}
          >
            Entrar
          </Button>
          }

        </Toolbar>

        {showLoginModal ? (<IniciarSessao handleMostrarIniciarSessao={handleShowLoginModal} />) : null}

      </Container>
    </AppBar>
    </nav>
  );
}

export default AppBarResponsivel;