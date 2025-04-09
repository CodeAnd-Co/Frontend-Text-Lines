import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, permisosPermitidos = [] }) => {
  const { usuario, cargando } = useAuth();

  // Muestra un indicador de carga mientras se verifica la autenticación
  if (cargando) return <p>Loading...</p>;

  // Redirige al login si no hay usuario autenticado
  if (!usuario) {
    return <Navigate to='/login' />;
  }

  // Si no hay roles/permisos requeridos, permite el acceso
  if (permisosPermitidos.length === 0) {
    return children;
  }

  // Verifica si el usuario tiene al menos uno de los permisos requeridos
  const tienePermiso = permisosPermitidos.some(
    (permiso) => usuario.permisos && usuario.permisos.includes(permiso)
  );

  // Si no tiene los permisos necesarios, redirige al login o a una página de acceso denegado
  if (!tienePermiso) {
    return <Navigate to='/login' />;
  }

  // Si tiene los permisos necesarios, muestra el contenido protegido
  return children;
};

export default RutaProtegida;
