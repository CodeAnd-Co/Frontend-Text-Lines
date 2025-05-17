import { createContext, useContext, useEffect, useState } from 'react';
import { useMode } from '@SRC/theme';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { toggleColorMode } = useMode();

  useEffect(() => {
    verificarSesion();
  }, []);

  const resetearTema = () => {
    // Obtener el tema actual del localStorage
    const temaActual = localStorage.getItem('tema');

    // Si el tema actual es oscuro, cambiarlo a claro
    if (temaActual && JSON.parse(temaActual) === 'dark') {
      toggleColorMode();
    }

    // Borrar el tema del localStorage
    localStorage.removeItem('tema');
  };

  const cerrarSesion = async () => {
    try {
      await axios.post(
        `${API_URL}/api/autenticacion/cerrar-sesion`,
        {},
        {
          withCredentials: true,
          headers: { 'x-api-key': API_KEY },
        }
      );
      // Resetear el tema a modo claro
      resetearTema();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setUsuario(null);
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
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        cargando,
        cerrarSesion,
        verificarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
