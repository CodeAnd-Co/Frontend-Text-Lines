import { useAuth } from '../hooks/AuthProvider';
import { Navigate } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';

export default function VerificarClienteSeleccionado({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (!usuario?.clienteSeleccionado) {
    return <Navigate to={RUTAS.SISTEMA_ADMINISTRATIVO.BASE} replace />;
  }

  return children;
}
