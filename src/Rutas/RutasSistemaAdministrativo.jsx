import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
import ListaEmpleados from '../Vistas/Paginas/Empleados/ListaEmpleados';
import ListaUsuarios from '../vistas/Paginas/Usuarios/ListaUsuarios';
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
        path={RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_EMPLEADOS}>
            <VerificarClienteSeleccionado>
              <ListaEmpleados />
            </VerificarClienteSeleccionado>
          </RutaProtegida>    
        }
      />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_USUARIOS}>
              <ListaUsuarios />
          </RutaProtegida>    
        }
      />
    </Routes>
  );
};

export default RutasSistemaAdministrativo;