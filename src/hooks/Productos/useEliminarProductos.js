import { useState, useEffect } from 'react';
import { repositorioEliminarProductos } from '../../dominio/repositorios/Productos/repositorioEliminarProductos';

/**
 * Hook para eliminar productos usando el repositorio
 *
 * @param {Array<number>} idsProducto - Array de IDs de productos a eliminar.
 * @returns {Object} { mensaje, error }
 */
export const useEliminarProductos = (idsProducto) => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eliminar = async () => {
      if (idsProducto.length === 0) return;
        setCargando(true);
        setError(null);

      try {
        const respuesta = await repositorioEliminarProductos(idsProducto);
        setMensaje(respuesta?.mensaje || 'Productos eliminados correctamente.');
        setCargando(false);
      } catch (error) {
        setError(error.response?.data?.mensaje || 'Error al eliminar productos.');
        setMensaje('');
        setCargando(false);

      }
    };

    eliminar();
  }, [idsProducto]);

  return { mensaje, error };
};