import { useAuth } from '../hooks/AuthProvider';
import Error403 from '../vistas/paginas/errores/Error403';
import IniciarSesion from '../vistas/paginas/IniciarSesion';

export default function RutaProtegida({ permiso, children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;

  if (!usuario) {
    return <IniciarSesion />;
  }

  if (permiso && usuario.permisos?.includes(permiso)) {
    return children;
  }

  return <Error403 />;
}
