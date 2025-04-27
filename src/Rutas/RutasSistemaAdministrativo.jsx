import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
import ListaCuotas from '../vistas/Paginas/Cuotas/ListaCuotas';
import LIstaEmpleados from '../vistas/Paginas/Empleados/ListaEmpleados';
import EditarCuotas from '../vistas/Paginas/Cuotas/EditarCuotas';
import ListaGrupoEmpleados from '../Vistas/Paginas/Empleados/ListaGrupoEmpleados';
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
        <Route path='empleados/consultar-lista' element={<LIstaEmpleados />} />
        <Route path='empleados/consultar-grupos' element={<ListaGrupoEmpleados />} />
        <Route path='cuotas' element={<ListaCuotas />} />
        <Route path='cuotas/editar-cuota' element={<EditarCuotas />} />
      </Route>
      <Route
        path={
            RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
            RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.BASE +
            RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_CATEGORIAS
          }
        element={
          <VerificarClienteSeleccionado>
            <RutaProtegida permiso={PERMISOS.CONSULTAR_CATEGORIAS_PRODUCTOS}>
              <ListaCategorias />
            </RutaProtegida>
          </VerificarClienteSeleccionado>
        }
      />
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
