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
      <h1 style={{ marginBottom: 20 }}>Faça o seu Pré-Cadastro.</h1>
      <p style={{ marginBottom: 40 }}>Siga para o Formulário e realize o seu Pré-Cadastro agora!</p>
      <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#45674C",
                width: "11rem",
                height: "2.95rem",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
                '&:hover': {
                  backgroundColor: "lightgrey"
                }
              }}
              onClick={() => {navigate("/precadastro");}}
            >
              Pré-Cadastro
            </Button>
    </Container>
  );
}

export default HomeContent;