//RF[8] Leer Rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8

import { useState } from 'react';
import { RepositorioActualizarRol } from '@Repositorios/Roles/RepositorioActualizarRol';

const useActualizarRol = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exitoso, setExitoso] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const actualizarRol = async (idRol, datosRol) => {
    setCargando(true);
    setError(null);
    setExitoso(false);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarRol.actualizar(idRol, datosRol);
      setMensaje(respuesta.mensaje || 'Rol actualizado exitosamente');
      setExitoso(true);
      return { success: true, data: respuesta };

    } catch (err) {
      const mensajeError = err.message || 'Error al actualizar el rol';
      setError(mensajeError);
      console.error('Error al actualizar rol:', err);
      return { success: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  const limpiarEstado = () => {
    setError(null);
    setExitoso(false);
    setMensaje('');
  };

  return {
    actualizarRol,
    cargando,
    error,
    exitoso,
    mensaje,
    limpiarEstado,
  };
};

export default useActualizarRol;