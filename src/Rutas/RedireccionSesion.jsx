import { Navigate } from 'react-router-dom';
import { useAuth } from '@Hooks/AuthProvider';
import { RUTAS } from '@Constantes/rutas';

export default function RedireccionSesion({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (!usuario) {
    return <Navigate to={RUTAS.INICIO_SESION} />;
  }

  return children;
}
