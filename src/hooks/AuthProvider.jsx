import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// URL base de la API y clave de autenticación desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Contexto para compartir el estado de autenticación en toda la app
const AuthContext = createContext(null);

// Rutas públicas que no requieren autenticación
const RUTAS_PUBLICAS = ["/login", "/register"];

/**
 * Proveedor de contexto de autenticación.
 *
 * Maneja el estado del usuario autenticado, verifica la sesión actual con la API
 * y proporciona funciones para cerrar sesión.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Estado del usuario autenticado
  const [cargando, setCargando] = useState(true); // Bandera de carga mientras se verifica autenticación
  const ubicacion = useLocation(); // Ubicación actual para detectar cambios de ruta
  const navigate = useNavigate(); // Hook para redireccionar
  const verificandoAuthRef = useRef(false); // Previene múltiples verificaciones al mismo tiempo
  const esMontajeInicialRef = useRef(true); // Marca si es el primer montaje

  useEffect(() => {
    // Determina si la ruta actual requiere autenticación
    const rutaActualRequiereAuth = !RUTAS_PUBLICAS.includes(ubicacion.pathname);

    // Solo verificar autenticación si es el primer render o si la ruta lo requiere
    const deberiaVerificarAuth =
      (esMontajeInicialRef.current || rutaActualRequiereAuth) &&
      !verificandoAuthRef.current;

    if (deberiaVerificarAuth) {
      verificandoAuthRef.current = true;
      esMontajeInicialRef.current = false;

      axios
        .get(`${API_URL}/api/autenticacion/autenticar`, {
          headers: {
            "x-api-key": API_KEY,
          },
          withCredentials: true,
        })
        .then((res) => {
          setUsuario(res.data.user);
        })
        .catch(() => {
          setUsuario(null);
          if (rutaActualRequiereAuth) {
            navigate("/login", { replace: true });
          }
        })
        .finally(() => {
          setCargando(false);
          verificandoAuthRef.current = false;
        });
    } else if (!deberiaVerificarAuth && esMontajeInicialRef.current) {
      // Si no se necesita verificación en el primer render
      esMontajeInicialRef.current = false;
      setCargando(false);
    }
  }, [ubicacion.pathname, navigate]);

  useEffect(() => {
    // Redirige al login si no hay usuario autenticado en rutas protegidas
    if (
      !cargando &&
      usuario === null &&
      !RUTAS_PUBLICAS.includes(ubicacion.pathname)
    ) {
      navigate("/login", { replace: true });
    }
  }, [usuario, cargando, ubicacion.pathname, navigate]);

  /**
   * Cierra la sesión del usuario autenticado.
   *
   * Llama a la API para cerrar sesión y limpia el estado del usuario,
   * redirigiendo al login incluso si ocurre un error.
   *
   * @returns {Promise<void>}
   */
  const cerrarSesion = async () => {
    try {
      await axios.post(
        `${API_URL}/api/autenticacion/cerrar-sesion`,
        {},
        {
          withCredentials: true,
          headers: { "x-api-key": API_KEY },
        }
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
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

/**
 * Hook para acceder al contexto de autenticación.
 *
 * @returns {{
 *   usuario: object|null,
 *   setUsuario: Function,
 *   cargando: boolean,
 *   cerrarSesion: () => Promise<void>
 * }}
 */
export const useAuth = () => useContext(AuthContext);
