import './App.css';

import { ColorModeContext, useMode } from '@SRC@SRC/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@Hooks/AuthProvider';

import RutasApp from '@Rutas/RutasApp';
import { RUTAS } from '@Constantes/rutas';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <div className='app'>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AuthProvider>
              <Routes>
                <Route path={RUTAS.RAIZ} element={<RutasApp />} />
              </Routes>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
