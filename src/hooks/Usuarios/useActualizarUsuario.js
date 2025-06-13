import { useState } from 'react';
import { RepositorioActualizarUsuario } from '@Repositorios/Usuarios/RepositorioActualizarUsuario';

export function useActualizarUsuario() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const actualizar = async (cambios) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarUsuario.actualizar(cambios);
      setMensaje(respuesta.mensaje || 'Actualización exitosa');
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setCargando(false);
    }
  };

  return { actualizar, cargando, error, mensaje };
}
