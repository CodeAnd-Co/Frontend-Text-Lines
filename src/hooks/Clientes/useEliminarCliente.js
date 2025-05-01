import { useEffect, useState } from 'react';
import { repositorioEliminarCliente } from '../../dominio/repositorios/Clientes/repositorioEliminarCliente';

/**
 * Hook para eliminar un cliente por su ID.
 * 
 * @param {number|null} idCliente - ID del cliente a eliminar.
 * @param {Function} setEliminacionExitosa - Función para marcar si fue exitosa la eliminación.
 * @param {Function} onSuccess - Función a ejecutar si la eliminación fue exitosa (recibe el ID eliminado).
 * @returns {{ error: string|null }}
 */
export function useEliminarCliente(idCliente, setEliminacionExitosa, onSuccess) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const eliminarCliente = async () => {
      try {
        await repositorioEliminarCliente(idCliente);
        setError(null);
        setEliminacionExitosa(true);
        if (onSuccess) onSuccess(idCliente);
      } catch (err) {
        setError(err.message);
        setEliminacionExitosa(false);
      }
    };

    if (typeof idCliente === 'number') {
      eliminarCliente();
    }
  }, [idCliente, setEliminacionExitosa, onSuccess]);

  return { error };
}