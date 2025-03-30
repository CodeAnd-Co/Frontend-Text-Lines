import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate,  Link } from "react-router-dom";
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

function App() {
  const [theme, colorMode] = useMode();
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <BarraLateral />
          <main className="content">
            <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/grupoEmpleados" element={<GrupoEmpleados />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/setsProductos" element={<SetsDeProductos />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/cuotas" element={<Cuotas />} />           
              <Route path="/configuracion" element={<Configuracion />} />
              </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  </ColorModeContext.Provider>      
  );
}

export default App;
