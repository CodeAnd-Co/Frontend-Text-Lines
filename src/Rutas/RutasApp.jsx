import { Routes, Route } from 'react-router-dom';
import RutasAdministrativas from './RutasSistemaAdministrativo';
import RutasTienda from './RutasTienda';
import IniciarSesion from '../Vistas/Paginas/IniciarSesion';
import { RUTAS } from '../Utilidades/Constates/rutas';
import { PERMISOS } from '../Utilidades/Constates/permisos';

import RutaPrivada from './RutaPrivada';
import RutaPublica from './RutaPublica';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={RUTAS.INICIO}
        element={
          <RutaPublica>
            <IniciarSesion />
          </RutaPublica>
        }
      />
      <Route
        path={RUTAS.INICIO_SESION}
        element={
          <RutaPublica>
            <IniciarSesion />
          </RutaPublica>
        }
      />
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.BASE}
        element={
          <RutaPrivada permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
            <RutasAdministrativas />
          </RutaPrivada>
        }
      />
      <Route
        path={RUTAS.SISTEMA_TIENDA.BASE}
        element={
          <RutaPrivada permiso={PERMISOS.CONSULTAR_TIENDA}>
            <RutasTienda />
          </RutaPrivada>
        }
      />
    </Routes>
  );
}
