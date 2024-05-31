import AppBarResponsivel from '../components/AppBarResponsivel';
import { PainelContainer } from '../components/PainelContainer';

const Contato = () => {
    return (
        <PainelContainer>
            <AppBarResponsivel/>

            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'justify'}}>
                <h1 style={{ marginTop:20 }}>Contato</h1>
                <p>Bem-vindo à nossa plataforma ed-sinc.</p>

                <h2 style={{ marginTop:20 }}>E-mail</h2>
                <p>ed-sinc@email.com</p>

                {/* Adicione mais seções conforme necessário para descrever recursos específicos do seu projeto */}

            </div>

            
        </PainelContainer>
    );
};

export default Contato;