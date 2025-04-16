import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { RUTAS } from '../Utilidades/Constates/rutas';

export default function RutaPrivada({ permiso, children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (!usuario) {
    return <Navigate to={RUTAS.INICIO_SESION} replace />;
  }

  if (usuario.permisos?.includes(permiso)) {
    return children;
  }

  return <Navigate to={RUTAS.INICIO_SESION} replace />;
}
