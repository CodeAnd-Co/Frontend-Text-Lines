// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30

import { useEffect, useState } from 'react';
import { RepositorioEliminarProductos } from '../../dominio/repositorios/Productos/repositorioEliminarProductos';   

/**
 * Hook para eliminar uno o más productos.
 * @param {array} idsProducto
 * @return {{
 *  mensaje: string,
 *  cargando: boolean,
 *  error: string | null,
 * }}
 */

export function useEliminarProductos(idsProducto) {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const eliminarProducto = async () => {
      setCargando(true);
      setError(null);

      try {
        const { mensaje } = await RepositorioEliminarProductos.eliminarProducto(idsProducto);
        setMensaje(mensaje);
      } catch (err) {
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (Array.isArray(idsProducto) && idsProducto.length > 0) {
      eliminarProducto();
    }
  }, [idsProducto]);

  return { mensaje, cargando, error };
}
