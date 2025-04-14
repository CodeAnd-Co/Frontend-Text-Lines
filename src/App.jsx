import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useLocation,
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
import Eventos from "./vistas/paginas/eventos";
import Configuracion from "./vistas/paginas/configuracion";
import { AuthProvider } from "./hooks/AuthProvider";
import RutaProtegida from "./vistas/componentes/organismos/RutaProtegida";
import PaginaInicioSesion from "./vistas/paginas/inicioSesion";
import Tienda from "./Tienda";

// Layout component that conditionally renders the sidebar
const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

import { AuthProvider } from "./AuthProvider";
import RutaProtegida from "./RutaProtegida";
import Usuarios from "./vistas/paginas/usuarios";

// Layout component that conditionally renders the sidebar
const AppLayout = () => {
  const location = useLocation();
  const isUsuarios = location.pathname === "/usuarios";

  return (
    <div className='app'>
      {!isLoginPage && <BarraLateral />}
      <main className={`content ${isLoginPage ? "full-width" : ""}`}>
        <Routes>
          <Route path='/' element={<Navigate to='/inicio' />} />
          <Route
            path='/inicio'
            element={
              <RutaProtegida>
                <Inicio />
              </RutaProtegida>
            }
          />
          <Route path='/login' element={<PaginaInicioSesion />} />
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
              <RutaProtegida
                permisosPermitidos={["Leer Categoría de Productos"]}
              >
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
            path='/eventos'
            element={
              <RutaProtegida>
                <Eventos />
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
          <Route path='/tienda' element={<Tienda></Tienda>} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
