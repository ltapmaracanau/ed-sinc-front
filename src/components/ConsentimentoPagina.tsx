import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { PainelContainer } from './PainelContainer';
import { BackgroundPadrao } from '../GlobalStyles';
import AppBarResponsivel from './AppBarResponsivel';

const ConsentimentoPagina = () => {
  const navigate = useNavigate();

  const handleConsent = () => {
    // Define o consentimento de cookies
    Cookies.set('cookiesConsentimento', 'true', { expires: 365 });
    // Redireciona o usuário para a página inicial após dar o consentimento
    navigate('/');
  };

  return (
    <PainelContainer>
    <AppBarResponsivel/>

    <BackgroundPadrao>

    <div>
    <div
        style={{
        display: "grid",
        color: "#B44609",
        fontWeight: "500",
        marginBottom: 80,
        padding: "0 40px",
        justifyItems: "center",
        alignItems: "center"
        }}
        >
        <h2 
        style={{
          fontSize:32,
        }}
        >Consentimento de Cookies e Similares</h2>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 650,
        textAlign: "justify",
        justifyItems: "center",
        marginBottom: 80,
        }}>
        <p style={{marginTop:-60, marginBottom: 120}}>Não foi possível acessar a página, visto que os termos de cookies ainda não foram aceitos. Por favor, aceite nosso uso de cookies para prosseguir sua navegação.</p>
      
      <button
          onClick={() => {handleConsent()}}
        >
          Aceitar Cookies
      </button>
    </div>
    </div>
      </BackgroundPadrao>
    </PainelContainer>

  );
};

export default ConsentimentoPagina;