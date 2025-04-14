import { useAuth } from "../../../hooks/AuthProvider";
import { Navigate } from "react-router-dom";

/**
 * Componente de ruta protegida que solo permite el acceso a usuarios autenticados
 * y con los permisos adecuados.
 *
 * Verifica la autenticación y los permisos del usuario antes de renderizar el contenido hijo.
 * Si el usuario no está autenticado o no tiene los permisos requeridos, será redirigido a la página de login.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido que se muestra si el usuario está autenticado y tiene los permisos adecuados.
 * @param {string[]} [props.permisosPermitidos=[]] - Lista de permisos requeridos para acceder al contenido. Si no se especifica, el contenido será accesible para cualquier usuario autenticado.
 *
 * @returns {JSX.Element} - El contenido protegido o una redirección si no se cumplen las condiciones de autenticación y permisos.
 */
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
