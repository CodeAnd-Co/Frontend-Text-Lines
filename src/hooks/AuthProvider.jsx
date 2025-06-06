import { createContext, useContext, useEffect, useState } from 'react';
import { useMode } from '@SRC/theme';
import Swal from 'sweetalert2'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(() => {
    const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
    return nombreUsuarioGuardado ? JSON.parse(nombreUsuarioGuardado) : null;
  });
  const [cargando, setCargando] = useState(true);
  const [csrfToken, setCsrfToken] = useState(null);
  const { toggleColorMode } = useMode();

  // Configure axios interceptor for CSRF token
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Add CSRF token to non-GET requests
        if (csrfToken && config.method !== 'get') {
          config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If CSRF token is invalid, refresh it
        if (error.response?.status === 403 && error.response?.data?.code === 'EBADCSRFTOKEN') {
          await obtenerCSRFToken();
          // Retry the original request
          const originalRequest = error.config;
          originalRequest.headers['X-CSRF-Token'] = csrfToken;
          return axios.request(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [csrfToken]);

  useEffect(() => {
    verificarSesion();
    obtenerCSRFToken();
  }, []);

  useEffect(() => {
    if (nombreUsuario) {
      localStorage.setItem('nombreUsuario', JSON.stringify(nombreUsuario));
    }
  }, [nombreUsuario]);

  const obtenerCSRFToken = async () => {
    try {
      const respuesta = await axios.get(`${API_URL}/api/csrf-token`, {
        headers: { 'x-api-key': API_KEY },
        withCredentials: true,
      });
      console.log(respuesta)
      setCsrfToken(respuesta.data.csrfToken);
    } catch (error) {
      console.error('Error al obtener token CSRF:', error);
    }
  };

  const resetearTema = () => {
    const temaActual = localStorage.getItem('tema');
    if (temaActual && JSON.parse(temaActual) === 'dark') {
      toggleColorMode();
    }
    localStorage.removeItem('tema');
  };

  const cerrarSesion = async () => {
    const resultado = await Swal.fire({
      title: '¿Estás seguro que quieres cerrar sesión?',
      showCancelButton: true,
      confirmButtonColor: 'rgba(24, 50, 165, 1)',
      cancelButtonColor: '#c62828',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No',
    });

    if (!resultado.isConfirmed) return;

    try {
      await axios.post(
        `${API_URL}/api/autenticacion/cerrar-sesion`,
        {},
        {
          withCredentials: true,
          headers: { 'x-api-key': API_KEY },
        }
      );
      resetearTema();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setUsuario(null);
      setCsrfToken(null);
    }
  };

  const verificarSesion = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/autenticacion/autenticar`, {
        headers: { 'x-api-key': API_KEY },
        withCredentials: true,
      });
      setUsuario(res.data.user);
    } catch {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      setUsuario,
      nombreUsuario,
      setNombreUsuario,
      cargando,
      cerrarSesion,
      verificarSesion,
      csrfToken,
      obtenerCSRFToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);