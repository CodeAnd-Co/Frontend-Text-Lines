import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { RUTAS } from '../Utilidades/Constates/rutas';

export default function RutaPublica({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (usuario) {
    const rutaDestino =
      usuario.clientesAsociados?.length > 0
        ? RUTAS.SISTEMA_ADMINISTRATIVO.BASE
        : RUTAS.SISTEMA_TIENDA.BASE;

    return <Navigate to={rutaDestino} replace />;
  }

  return children;
}
