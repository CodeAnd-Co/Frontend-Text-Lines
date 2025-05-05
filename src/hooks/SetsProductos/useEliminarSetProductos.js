//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]

import { useEffect, useState } from 'react';
import { RepositorioEliminarSetProductos } from '../../Dominio/Repositorios/SetsProductos/repositorioEliminarSetProductos';

/**
 * * Hook para eliminar un set de productos.
 * * @param {array} idsSetProductos
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */

export function useEliminarSetProductos(idsSetProductos) {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eliminarSetProductos = async () => {
      setCargando(true);
      setError(null);

      try {
        const { mensaje } = await RepositorioEliminarSetProductos.eliminarSetProductos(
          idsSetProductos
        );
        setMensaje(mensaje);
      } catch (err) {
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (Array.isArray(idsSetProductos) && idsSetProductos.length > 0) {
      eliminarSetProductos();
    }
  }, [idsSetProductos]);

  return { mensaje, cargando, error };
}
