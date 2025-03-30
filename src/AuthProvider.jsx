import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const ubicacion = useLocation();
  const verificandoAuthRef = useRef(false);
  const esMontajeInicialRef = useRef(true);

  useEffect(() => {
    // Solo verifica el estado de autenticación en el montaje inicial o cambios de ruta que requieran auth
    const deberiaVerificarAuth =
      (esMontajeInicialRef.current ||
        (ubicacion.pathname !== "/login" &&
          ubicacion.pathname !== "/register")) &&
      !verificandoAuthRef.current &&
      !usuario;

    if (deberiaVerificarAuth) {
      verificandoAuthRef.current = true; // Establece bandera para prevenir solicitudes duplicadas
      esMontajeInicialRef.current = false; // Ya no es montaje inicial

      axios
        .get(`${API_URL}/api/auth/me`, {
          headers: {
            "x-api-key":
              "$2b$10$gIq.OCeriVApWBM1g7aOAuOsL/c7SnQEpepETJ3g.JSbn7VjdjfRC",
          },
          withCredentials: true,
        })
        .then((res) => setUsuario(res.data.user))
        .catch((error) => {
          if (error.response) {
            console.warn("Acceso denegado");
            setUsuario(null);
          }
        })
        .finally(() => {
          setCargando(false);
          verificandoAuthRef.current = false; // Restablece la bandera después de completar la solicitud
        });
    } else if (!deberiaVerificarAuth && esMontajeInicialRef.current) {
      // Si no necesitamos verificar auth en el montaje inicial, detiene la carga
      esMontajeInicialRef.current = false;
      setCargando(false);
    }
  }, [ubicacion.pathname]); // Solo depende de cambios en pathname

  const cerrarSesion = async () => {
    await axios.post(
      `${API_URL}/api/logout`,
      {},
      { withCredentials: true, headers: { "x-api-key": "api-key" } }
    );
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, cargando, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
