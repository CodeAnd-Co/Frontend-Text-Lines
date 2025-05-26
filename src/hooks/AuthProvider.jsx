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
    // Obtener el nombre de usuario del localStorage
    const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
    return nombreUsuarioGuardado ? JSON.parse(nombreUsuarioGuardado) : null;
  });
  const [cargando, setCargando] = useState(true);
  const { toggleColorMode } = useMode();

  useEffect(() => {
    verificarSesion();
  }, []);

  useEffect(() => {
    // Guardar el nombre de usuario en el localStorage
    if (nombreUsuario) {
      localStorage.setItem('nombreUsuario', JSON.stringify(nombreUsuario));
    }
  }, [nombreUsuario]);

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
    const resultado = await Swal.fire({
      title: '¿Estás seguro que quieres cerrar sesion?',

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
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
