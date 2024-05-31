import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function HomeContent() {
  let navigate = useNavigate();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', 
      }}
    >
      {/* Conteúdo do seu aplicativo */}
      <h1 style={{ marginBottom: 20 }}>Frase de impacto</h1>
      <p style={{ marginBottom: 40 }}>Another one</p>
      <Button variant="contained" color="error" onClick={() => {navigate("/teste");}}>
        Botão
      </Button>
    </Container>
  );
}

export default HomeContent;