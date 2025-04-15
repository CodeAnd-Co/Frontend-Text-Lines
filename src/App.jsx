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
import Eventos from "./vistas/paginas/eventos";
import Configuracion from "./vistas/paginas/configuracion";
import { AuthProvider } from "./hooks/AuthProvider";
import RutaProtegida from "./Vistas/Componentes/Organismos/RutaProtegida";
import PaginaInicioSesion from "./vistas/paginas/inicioSesion";
import Tienda from "./Tienda";

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
