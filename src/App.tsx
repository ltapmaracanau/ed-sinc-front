import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/Cores';
import Home from './pages/Home';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';

const urlAPI = import.meta.env.VITE_REACT_APP_API_URL;

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* Home Sistema */}
            <Route path='/' element={<Home />} />
            <Route path='/contato' element={<Contato />} />
            <Route path='/sobre' element={<Sobre />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;