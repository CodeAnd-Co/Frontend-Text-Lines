import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import BarraLateral from "./vistas/plantillas/global/barraLateral";
import Inicio from "./vistas/paginas/inicio";
import Empleados from "./vistas/paginas/empleados";
import GrupoEmpleados from "./vistas/paginas/grupoEmpleados";
import Productos from "./vistas/paginas/productos";
import Categorias from "./vistas/paginas/categoriasProductos";
import Pedidos from "./vistas/paginas/pedidos";
import Cuotas from "./vistas/paginas/cuotas";
import SetsDeProductos from "./vistas/paginas/setsProducto";
import Configuracion from "./vistas/paginas/configuracion";
import { AuthProvider } from "./AuthProvider";
import RutaProtegida from "./RutaProtegida";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <div className='app'>
              <BarraLateral />
              <main className='content'>
                <Routes>
                  <Route path='/' element={<Navigate to='/inicio' />} />
                  <Route path='/inicio' element={<Inicio />} />
                  <Route
                    path='/empleados'
                    element={
                      <RutaProtegida>
                        <Empleados />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/grupoEmpleados'
                    element={
                      <RutaProtegida>
                        <GrupoEmpleados />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/productos'
                    element={
                      <RutaProtegida>
                        <Productos />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/categorias'
                    element={
                      <RutaProtegida>
                        <Categorias />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/setsProductos'
                    element={
                      <RutaProtegida>
                        <SetsDeProductos />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/pedidos'
                    element={
                      <RutaProtegida>
                        <Pedidos />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/cuotas'
                    element={
                      <RutaProtegida>
                        <Cuotas />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path='/configuracion'
                    element={
                      <RutaProtegida>
                        <Configuracion />
                      </RutaProtegida>
                    }
                  />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
