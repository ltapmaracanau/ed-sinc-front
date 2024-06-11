import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/Cores';
import Home from './pages/Home';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import ConsentimentoPagina from './components/ConsentimentoPagina';
import UsuariosHome from './pages/Usuarios/UsuariosHome';

const urlServidor = import.meta.env.VITE_REACT_APP_API_URL;
localStorage.setItem('urlServidor', urlServidor as string);

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* Home Sistema */}
            <Route path="/consentimento" element={<ConsentimentoPagina />} />
            <Route path='/' element={<Home />} />
            <Route path='/contato' element={<Contato />} />
            <Route path='/sobre' element={<Sobre />} />
            <Route path='/usuarios' element={<UsuariosHome />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;