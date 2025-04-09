import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, rolesPermitidos = [] }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Loading...</p>;

  if (!usuario) {
    return <Navigate to='/login' />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default RutaProtegida;
