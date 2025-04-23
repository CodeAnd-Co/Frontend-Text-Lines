import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
<<<<<<< HEAD
import Productos from '../vistas/paginas/Productos/ListaProductos';
import ListaCategorias from '../vistas/Paginas/Categorias/ListaCategorias';
=======
// import ListaProductos from '../Vistas/Paginas/Productos/ListaProductos';
import ListaGrupoEmpleados from '../Vistas/Paginas/Empleados/ListaGrupoEmpleados';
>>>>>>> e2af3dd7800d87c260b73292ce168bcefd59b580
import SistemaAdministrativo from '../Vistas/Paginas/SistemaAdministrativo';
import Configuracion from '../Vistas/Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '../Vistas/Paginas/Errores/Error404';

import RutaProtegida from './RutaProtegida';
import VerificarClienteSeleccionado from './VerificarClienteSeleccionado';

const RutasSistemaAdministrativo = () => {
  return (
    <Routes>
      <Route path={RUTAS.RAIZ} element={<Error404 />} />
      <Route path={RUTAS.INICIO} element={<ListaClientes />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION} element={<Configuracion />} />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO}
        element={
          <VerificarClienteSeleccionado>
            <RutaProtegida permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
              <SistemaAdministrativo />
            </RutaProtegida>
          </VerificarClienteSeleccionado>
        }
      >
        <Route path='empleados/consultar-grupos' element={<ListaGrupoEmpleados />} />
      </Route>
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
