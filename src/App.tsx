import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/Cores';
import Home from './pages/Home';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import ConsentimentoPagina from './components/ConsentimentoPagina';
import ProtectedRoute from './components/ProtectedRoute';
import UsuariosHome from './pages/Usuarios/UsuariosHome';
import PessoaNeurodivergenteHome from './pages/PessoaNeurodivergente/PessoaNeurodivergenteHome';
import PessoaComDeficienciaHome from './pages/PessoaComDeficiencia/PessoaComDeficienciaHome';
import GruposSociaisHome from './pages/GruposSociais/GruposSociaisHome';
import PolosHome from './pages/Polos/PolosHome';
import PreCadastroContent from './pages/Home/PreCadastroContent';

const urlServidor = import.meta.env.VITE_REACT_APP_API_URL;
localStorage.setItem('urlServidor', urlServidor as string);

const App: React.FC = () => {
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
            <Route path='/precadastro' element={<PreCadastroContent />} />
            <Route
              path='/usuarios'
              element={
                <ProtectedRoute
                  element={<UsuariosHome />}
                  categorias={['Administrador', 'Coordenador']}
                />
              }
            />
            <Route
              path='/pessoaneurodivergente'
              element={
                <ProtectedRoute
                  element={<PessoaNeurodivergenteHome />}
                  categorias={['Administrador', 'Coordenador']}
                />
              }
            />
            <Route
              path='/pcd'
              element={
                <ProtectedRoute
                  element={<PessoaComDeficienciaHome />}
                  categorias={['Administrador', 'Coordenador']}
                />
              }
            />
            <Route
              path='/grupossociais'
              element={
                <ProtectedRoute
                  element={<GruposSociaisHome />}
                  categorias={['Administrador', 'Coordenador']}
                />
              }
            />
            <Route
              path='/polos'
              element={
                <ProtectedRoute
                  element={<PolosHome />}
                  categorias={['Administrador', 'Coordenador']}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
