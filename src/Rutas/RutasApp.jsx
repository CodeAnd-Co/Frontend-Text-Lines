import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '@Constantes/rutas';
import { PERMISOS } from '@Constantes/permisos';
import RutaProtegida from '@Rutas/RutaProtegida';
import RutasAdministrativas from '@Rutas/RutasSistemaAdministrativo';
import RutasTienda from '@Rutas/RutasTienda';
import RedireccionSesion from '@Rutas/RedireccionSesion';
import RutasSesion from '@Rutas/RutasSesion';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={RUTAS.RAIZ}
        element={
          <RedireccionSesion>
            <RutasSesion />
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
