import AppBarResponsivel from '../components/AppBarResponsivel';
import HomeContent from './Home/HomeContent';
import { PainelContainer } from '../components/PainelContainer';


const Home = () => {

    return (
        <PainelContainer>
            <AppBarResponsivel/>
            <HomeContent/>
        </PainelContainer>
    );
};

export default Home;