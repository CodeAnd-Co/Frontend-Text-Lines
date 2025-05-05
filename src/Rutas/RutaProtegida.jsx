import { useAuth } from '@Hooks/AuthProvider';
import Error403 from '@SRC/Vistas/Paginas/Errores/Error403';
import IniciarSesion from '@SRC/Vistas/Paginas/IniciarSesion';

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
