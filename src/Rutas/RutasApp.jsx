import { Routes, Route } from 'react-router-dom';

import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';

import RutaProtegida from './RutaProtegida';
import RutasAdministrativas from './RutasSistemaAdministrativo';
import RutasTienda from './RutasTienda';
import Error404 from '../vistas/Paginas/Errores/Error404';
import RedireccionSesion from './RedireccionSesion';
import RutasSesion from './RutasSesion';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={RUTAS.RAIZ}
        element={
          <RedireccionSesion>
            <Error404 />
          </RedireccionSesion>
        }
      />
      <Route path={RUTAS.INICIO_SESION} element={<RutasSesion />} />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.RAIZ}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
            <RutasAdministrativas />
          </RutaProtegida>
        }
      />
      <Route
        path={RUTAS.SISTEMA_TIENDA.BASE + RUTAS.RAIZ}
        element={
          <RutaProtegida permiso={PERMISOS.CONSULTAR_TIENDA}>
            <RutasTienda />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}
