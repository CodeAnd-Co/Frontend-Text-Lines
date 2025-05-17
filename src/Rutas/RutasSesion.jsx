import { Navigate } from 'react-router-dom';
import { useAuth } from '@Hooks/AuthProvider';
import { RUTAS } from '@Constantes/rutas';
import { PERMISOS } from '@Constantes/permisos';
import Error403 from '@Errores/Error403';
import IniciarSesion from '@Paginas/IniciarSesion';

export default function RutasSesion() {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (!usuario) {
    return <IniciarSesion />;
  }

  if (usuario.permisos.includes(PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO)) {
    return <Navigate to={RUTAS.SISTEMA_ADMINISTRATIVO.BASE} />;
  }

  if (usuario.permisos.includes(PERMISOS.CONSULTAR_TIENDA)) {
    return <Navigate to={RUTAS.SISTEMA_TIENDA.BASE} />;
  }

  return <Error403 />;
}
