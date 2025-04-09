import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const AuthContext = createContext(null);

// Rutas públicas que no requieren autenticación
const RUTAS_PUBLICAS = ["/login", "/register"];

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const ubicacion = useLocation();
  const navigate = useNavigate();
  const verificandoAuthRef = useRef(false);
  const esMontajeInicialRef = useRef(true);

  useEffect(() => {
    // Solo verifica el estado de autenticación en el montaje inicial o cambios de ruta que requieran auth
    const rutaActualRequiereAuth = !RUTAS_PUBLICAS.includes(ubicacion.pathname);
    const deberiaVerificarAuth =
      (esMontajeInicialRef.current || rutaActualRequiereAuth) &&
      !verificandoAuthRef.current;

    if (deberiaVerificarAuth) {
      verificandoAuthRef.current = true; // Establece bandera para prevenir solicitudes duplicadas
      esMontajeInicialRef.current = false; // Ya no es montaje inicial

      axios
        .get(`${API_URL}/api/auth/me`, {
          headers: {
            "x-api-key": API_KEY,
          },
          withCredentials: true,
        })
        .then((res) => {
          setUsuario(res.data.user);
        })
        .catch((error) => {
          setUsuario(null);
          // Si hay un error de autenticación y la ruta requiere autenticación, redirige al login
          if (rutaActualRequiereAuth) {
            navigate("/login", { replace: true });
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
  }, [ubicacion.pathname, navigate]);

  // Añadimos un efecto adicional para manejar los cambios en el estado de usuario
  useEffect(() => {
    // Si no está cargando y el usuario es null y la ruta requiere autenticación
    if (
      !cargando &&
      usuario === null &&
      !RUTAS_PUBLICAS.includes(ubicacion.pathname)
    ) {
      navigate("/login", { replace: true });
    }
  }, [usuario, cargando, ubicacion.pathname, navigate]);

  const cerrarSesion = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        { withCredentials: true, headers: { "x-api-key": API_KEY } }
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      // Incluso si hay un error en la solicitud, limpiamos el estado de usuario
      setUsuario(null);
      navigate("/login", { replace: true });
    }
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
