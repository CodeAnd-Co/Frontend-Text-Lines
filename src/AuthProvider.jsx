import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const ubicacion = useLocation();

  useEffect(() => {
    if (
      !usuario &&
      ubicacion.pathname !== "/login" &&
      ubicacion.pathname !== "/register"
    ) {
      axios
        .get(`${API_URL}/api/auth/me`, { withCredentials: true })
        .then((res) => setUsuario(res.data.user))
        .catch((error) => {
          if (error.response) {
            console.warn("Acceso denegado");
            setUsuario(null);
          }
        })
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, [usuario, ubicacion.pathname]);

  const logout = async () => {
    await axios.post(
      `${API_URL}/api/logout`,
      {},
      { withCredentials: true, headers: { "x-api-key": "api-key" } }
    );
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, cargando, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
