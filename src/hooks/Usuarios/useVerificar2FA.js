import { useState } from 'react';
import { RepositorioVerificar2FA } from '@Repositorios/Usuarios/repositorioVerificar2FA';

export const useVerificar2FA = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const verificar2FA = async ({ idUsuario, codigo }) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await RepositorioVerificar2FA.verificar({ idUsuario, codigo });
      return respuesta;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { verificar2FA, cargando, error, setError };
};
