import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../vistas/paginas/clientes/ListaClientes';
import ListaProductos from '../vistas/paginas/productos/ListaProductos';
import ListaCuotas from '../vistas/paginas/cuotas/ListaCuotas';
import LIstaEmpleados from '../vistas/paginas/empleados/ListaEmpleados';
import EditarCuotas from '../vistas/paginas/cuotas/EditarCuotas';
import ListaGrupoEmpleados from '../vistas/paginas/empleados/ListaGrupoEmpleados';
import SistemaAdministrativo from '../vistas/paginas/SistemaAdministrativo';
import Configuracion from '../vistas/paginas/configuracion/ConfiguracionGeneral';
import Error404 from '../vistas/paginas/errores/Error404';
import ListaRoles from '../vistas/paginas/roles/ListaRoles';
import ListaUsuarios from '../vistas/paginas/usuarios/ListaUsuarios';
import ListaCategorias from '../vistas/paginas/categorias/ListaCategorias';
import ListaSetsProductos from '../vistas/paginas/SetsProductos/ListaSetsProductos';

import RutaProtegida from './RutaProtegida';
import VerificarClienteSeleccionado from './VerificarClienteSeleccionado';
import ListaPedidos from '../vistas/paginas/pedidos/ListaPedidos';

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
      {/* Rutas del tablero */}
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
        {/* Empleados */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS.CONSULTAR_EMPLEADOS}
          element={<LIstaEmpleados />}
        />
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS.CONSULTAR_GRUPOS}
          element={<ListaGrupoEmpleados />}
        />

        {/* Cuotas */}
        <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.BASE} element={<ListaCuotas />} />
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS}
          element={<EditarCuotas />}
        />

        {/* Productos */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_PRODUCTOS}
          element={<ListaProductos />}
        />
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_SETS_PRODUCTOS}
          element={<ListaSetsProductos />}
        />
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_CATEGORIAS}
          element={<ListaCategorias />}
        />

        {/* Pedidos */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.PEDIDOS.CONSULTAR_PEDIDOS}
          element={<ListaPedidos />}
        />
      </Route>
      {/* Rutas fuera del tablero */}
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
