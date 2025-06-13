import { useState } from 'react';
import { RepositorioActualizarCategoria } from '@Repositorios/Categorias/repositorioActualizarCategoria';

/**
 * Hook personalizado para manejar la actualización de una categoría.
 *
 * RF49 - Actualizar Categoría
 * @returns {object} Funciones y estados relacionados con la actualización.
 */
const useActualizarCategoria = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exitoso, setExitoso] = useState(false);
  const [mensaje, setMensaje] = useState('');

  /**
   * Ejecuta la actualización de una categoría llamando al repositorio.
   *
   * @param {number} idCategoria - ID de la categoría a actualizar.
   * @param {object} datosCategoria - Datos nuevos para la categoría.
   * @returns {Promise<object>} - Resultado de la operación.
   */
  const actualizarCategoria = async (idCategoria, datosCategoria) => {
    setCargando(true);
    setError(null);
    setExitoso(false);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarCategoria.actualizar(idCategoria, datosCategoria);
      setMensaje(respuesta.mensaje || 'Categoría actualizada exitosamente');
      setExitoso(true);
      return { success: true, data: respuesta };
    } catch (err) {
      const mensajeError = err.message || 'Error al actualizar la categoría';
      setError(mensajeError);
      return { success: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  /**
   * Limpia los estados de error, éxito y mensaje del hook.
   */
  const limpiarEstado = () => {
    setError(null);
    setExitoso(false);
    setMensaje('');
  };

  return {
    actualizarCategoria,
    cargando,
    error,
    exitoso,
    mensaje,
    limpiarEstado,
  };
};

export default useActualizarCategoria;
