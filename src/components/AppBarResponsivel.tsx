import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import edsinclogo from '../assets/ed-sinc-logo.png';

function AppBarResponsivel() {
  let navigate = useNavigate();

  const [anchorElEntidades, setAnchorElEntidades] = React.useState<null | HTMLElement>(null);

  const handleOpenEntidadesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEntidades(event.currentTarget);
  };

  const handleCloseEntidadesMenu = () => {
    setAnchorElEntidades(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (anchorElEntidades && !anchorElEntidades.contains(event.target as Node)) {
      handleCloseEntidadesMenu();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [anchorElEntidades]);

  return (
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

        </Toolbar>

      </Container>
    </AppBar>
  );
}

export default AppBarResponsivel;