// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

import { useState } from 'react';
import { RepositorioActualizarSetProductos } from '@Repositorios/SetsProductos/RepositorioActualizarSetProductos';

/**
 * Hook para actualizar los datos de un set de productos
 * @returns {Object} Objeto con la función de actualización y estados
 */
export const useActualizarSetsProductos = () => {
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const actualizarSet = async (idSet, nombre, descripcion, activo, productos) => {
    if (!idSet) return;

    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      const resultado = await RepositorioActualizarSetProductos.actualizarSetProductos(
        idSet,
        nombre,
        descripcion,
        activo,
        productos
      );

      setExito(true);
      setMensaje(resultado?.data?.mensaje || 'Set de productos actualizado exitosamente');
      return resultado;
    } catch (err) {
      setExito(false);
      setError(true);
      const errorMessage =
        err?.response?.data?.mensaje ||
        err?.response?.data?.error ||
        err?.message ||
        'Ocurrió un error al actualizar el set de productos';

      setMensaje(errorMessage);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const resetEstado = () => {
    setExito(false);
    setError(false);
    setMensaje('');
  };

  return {
    actualizarSet,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
  };
};

export default useActualizarSetsProductos;
