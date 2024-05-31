import AppBarResponsivel from '../components/AppBarResponsivel';
import { PainelContainer } from '../components/PainelContainer';

const Sobre = () => {
    return (
        <PainelContainer>
            <AppBarResponsivel/>

            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'justify'}}>
                <h1 style={{ marginTop:20 }}>Sobre a ed-sinc</h1>

                <h2 style={{ marginTop:20 }}>Tópico 1</h2>
                <p>Descrição 1</p>

                <h2 style={{ marginTop:20 }}>Tópico 2</h2>
                <p>Descrição 2</p>

            </div>

            
        </PainelContainer>
    );
};

export default Sobre;