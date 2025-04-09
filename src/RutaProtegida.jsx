import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Loading...</p>;
  return usuario ? children : <Navigate to='/inicio' />;
};

export default RutaProtegida;
