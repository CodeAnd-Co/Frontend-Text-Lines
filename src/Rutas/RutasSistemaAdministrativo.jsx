import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '@Constantes/rutas';
import { PERMISOS } from '@Constantes/permisos';
import ListaClientes from '@Clientes/ListaClientes';
import ListaProductos from '@Productos/ListaProductos';
import ListaCuotas from '@Cuotas/ListaCuotas';
import LIstaEmpleados from '@Empleados/ListaEmpleados';
import EditarCuotas from '@Cuotas/EditarCuotas';
import ListaGrupoEmpleados from '@Empleados/ListaGrupoEmpleados';
import SistemaAdministrativo from '@Paginas/SistemaAdministrativo';
import Error404 from '@Errores/Error404';
import ListaRoles from '@Roles/ListaRoles';
import ListaUsuarios from '@Usuarios/ListaUsuarios';
import ListaCategorias from '@Categorias/ListaCategorias';
import ListaSetsProductos from '@SetsProductos/ListaSetsProductos';
import ListaEventos from '@Eventos/ListaEventos';
import RutaProtegida from '@Rutas/RutaProtegida';
import VerificarClienteSeleccionado from '@Rutas/VerificarClienteSeleccionado';
import ListaPedidos from '@Pedidos/ListaPedidos';
import ConfiguracionGeneral from '@Configuracion/ConfiguracionGeneral';

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
        {/* EVENTOS */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.EVENTOS.CONSULTAR_EVENTOS}
          element={<ListaEventos />}
        />
        {/* Pedidos */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.PEDIDOS.CONSULTAR_PEDIDOS}
          element={<ListaPedidos />}
        />
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION}
          element={<ConfiguracionGeneral />}
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
