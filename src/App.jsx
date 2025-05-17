import './App.css';

import { ColorModeProvider } from '@SRC/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@Hooks/AuthProvider';

import RutasApp from '@Rutas/RutasApp';
import { RUTAS } from '@Constantes/rutas';

function App() {
  return (
    <div className='app'>
      <ColorModeProvider>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path={RUTAS.RAIZ} element={<RutasApp />} />
              </Routes>
            </AuthProvider>
          </Router>
      </ColorModeProvider>
    </div>
  );
}

export default App;
