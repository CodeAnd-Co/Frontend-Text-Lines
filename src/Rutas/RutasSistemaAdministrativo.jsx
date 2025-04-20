import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
import ListaCuotas from '../vistas/Paginas/Cuotas/ListaCuotas';
import ListaEmpleados from '../Vistas/Paginas/Empleados/ListaEmpleados';
import Configuracion from '../Vistas/Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '../Vistas/Paginas/Errores/Error404';
import EditarCuotas from '../vistas/Paginas/Cuotas/EditarCuotas';

import RutaProtegida from './RutaProtegida';
import VerificarClienteSeleccionado from './VerificarClienteSeleccionado';

const RutasSistemaAdministrativo = () => {
  return (
    <Routes>
      <Route path={RUTAS.RAIZ} element={<Error404 />} />
      <Route path={RUTAS.INICIO} element={<ListaClientes />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION} element={<Configuracion />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.BASE} element={<ListaCuotas />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS} element={<EditarCuotas />} />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_EMPLEADOS}>
            <VerificarClienteSeleccionado>
              <ListaEmpleados />
            </VerificarClienteSeleccionado>
          </RutaProtegida>
        }
      />
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
