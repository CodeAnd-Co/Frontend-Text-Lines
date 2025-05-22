import { useState } from 'react';
import { RepositorioActivar2FA } from '@Repositorios/Usuarios/repositorioActivar2FA';

export const useActivar2FA = () => {
  const [qrCode, setQrCode] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const activar2FA = async ({ idUsuario, nombre, correo }) => {
    setCargando(true);
    setError(null);
    try {
      const resultado = await RepositorioActivar2FA.activar({ idUsuario, nombre, correo });
      setQrCode(resultado.qrCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { activar2FA, qrCode, cargando, error, setQrCode };
};