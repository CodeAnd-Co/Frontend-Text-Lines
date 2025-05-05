import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '@Constantes/rutas';
import { PERMISOS } from '@Constantes/permisos';
import ListaClientes from '@Paginas/Clientes/ListaClientes';
import ListaProductos from '@Paginas/Productos/ListaProductos';
import ListaCuotas from '@Paginas/Cuotas/ListaCuotas';
import LIstaEmpleados from '@Paginas/Empleados/ListaEmpleados';
import EditarCuotas from '@Paginas/Cuotas/EditarCuotas';
import ListaGrupoEmpleados from '@Paginas/Empleados/ListaGrupoEmpleados';
import SistemaAdministrativo from '@Paginas/SistemaAdministrativo';
import Configuracion from '@Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '@Paginas/Errores/Error404';
import ListaRoles from '@Paginas/Roles/ListaRoles';
import ListaUsuarios from '@Paginas/Usuarios/ListaUsuarios';
import ListaCategorias from '@Paginas/Categorias/ListaCategorias';
import ListaSetsProductos from '@Paginas/SetsProductos/ListaSetsProductos';
import ListaEventos from '@Paginas/Eventos/ListaEventos';
import RutaProtegida from '@Rutas/RutaProtegida';
import VerificarClienteSeleccionado from '@Rutas/VerificarClienteSeleccionado';
import ListaPedidos from '@Paginas/Pedidos/ListaPedidos';

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

        {/* EVENTOS */}
        <Route
          path={RUTAS.SISTEMA_ADMINISTRATIVO.EVENTOS.CONSULTAR_EVENTOS}
          element={<ListaEventos />}
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
