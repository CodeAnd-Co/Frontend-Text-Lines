import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
import ListaProductos from '../vistas/paginas/Productos/ListaProductos';
import ListaCuotas from '../vistas/Paginas/Cuotas/ListaCuotas';
import LIstaEmpleados from '../vistas/Paginas/Empleados/ListaEmpleados';
import EditarCuotas from '../vistas/Paginas/Cuotas/EditarCuotas';
import ListaGrupoEmpleados from '../Vistas/Paginas/Empleados/ListaGrupoEmpleados';
import SistemaAdministrativo from '../Vistas/Paginas/SistemaAdministrativo';
import Configuracion from '../Vistas/Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '../Vistas/Paginas/Errores/Error404';
import ListaRoles from '../Vistas/Paginas/Roles/ListaRoles';
import ListaUsuarios from '../vistas/Paginas/Usuarios/ListaUsuarios';
import ListaCategorias from '../vistas/paginas/Categorias/ListaCategorias';

import RutaProtegida from './RutaProtegida';
import VerificarClienteSeleccionado from './VerificarClienteSeleccionado';

const RutasSistemaAdministrativo = () => {
  return (
    <Routes>
      <Route path={RUTAS.RAIZ} element={<Error404 />} />
      <Route path={RUTAS.INICIO} element={<ListaClientes />} />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_USUARIOS}>
            <ListaUsuarios />
          </RutaProtegida>
        }
      />
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
        <Route path='empleados/consultar-lista' element={<LIstaEmpleados />} />
        <Route path='empleados/consultar-grupos' element={<ListaGrupoEmpleados />} />
        <Route path='cuotas' element={<ListaCuotas />} />
        <Route path='cuotas/editar-cuotas' element={<EditarCuotas />} />
        <Route path='productos/consultar-lista' element={<ListaProductos />} />
        <Route path='productos/consultar-categorias' element={<ListaCategorias />} />
      </Route>
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
            <ListaUsuarios />
          </RutaProtegida>
        }
      />
      <Route
        path='/usuarios/consultar-roles'
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
            <ListaRoles />
          </RutaProtegida>
        }
      />
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
