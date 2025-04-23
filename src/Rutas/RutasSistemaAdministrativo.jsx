import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
// import ListaProductos from '../Vistas/Paginas/Productos/ListaProductos';
import ListaGrupoEmpleados from '../Vistas/Paginas/Empleados/ListaGrupoEmpleados';
import SistemaAdministrativo from '../Vistas/Paginas/SistemaAdministrativo';
import Configuracion from '../Vistas/Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '../Vistas/Paginas/Errores/Error404';
import EditarCuotas from '../vistas/Paginas/Cuotas/EditarCuotas';
import  ListaRoles  from '../vistas/Paginas/Roles/ListaRoles'; 
import  ListaUsuarios  from '../Vistas/Paginas/Usuarios/ListaUsuarios';
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
      />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.CATEGORIAS}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_CATEGORIAS_PRODUCTOS}>
            <ListaCategorias />
          </RutaProtegida>
        }
      />
    <Route
      path={RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}
      element={
        <RutaProtegida permiso={PERMISOS.CONSULTAR_USUARIOS}>
          <ListaUsuarios />
        </RutaProtegida>
      }
    />
    <Route
      path={RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.CONSULTAR_ROLES}
      element={
        <RutaProtegida permiso={PERMISOS.CONSULTAR_ROLES}>
          <ListaRoles />
        </RutaProtegida>
      }
    />
    <Route
      path={RUTAS.SISTEMA_ADMINISTRATIVO.ROLES}
      element={
        <RutaProtegida permiso={PERMISOS.CONSULTAR_ROLES}>
          <ListaRoles />
        </RutaProtegida>
      }
    />

      >
        <Route path='empleados/consultar-grupos' element={<ListaGrupoEmpleados />} />
      </Route>
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
