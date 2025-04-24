<<<<<<< HEAD
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import Usuarios from "./vistas/paginas/usuarios";
import Tienda from "./Tienda";

// PRUEBA
import { ejecutarObtenerUsuario } from "./hooks/Usuarios/leer-usuario";
window.ejecutarObtenerUsuario = ejecutarObtenerUsuario;

const AppLayout = () => {
  const location = useLocation();
  const rutasSinBarra = ["/login", "/usuarios"];
  const isRutaSinBarra = rutasSinBarra.includes(location.pathname);

  return (
    <div className='app'>
      {!isRutaSinBarra && <BarraLateral />}
      <main className={`content ${isRutaSinBarra ? "full-width" : ""}`}>
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
            path='/usuarios'
            element={
              <RutaProtegida>
                <Usuarios />
              </RutaProtegida>
            }
          />
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
=======
import './App.css';

import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';

import RutasApp from './Rutas/RutasApp';
import { RUTAS } from './Utilidades/Constantes/rutas';
>>>>>>> c7aac59f10f7d768c89052205e177f5f7feba15f

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