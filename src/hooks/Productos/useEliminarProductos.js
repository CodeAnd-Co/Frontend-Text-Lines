// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30

import { useState } from 'react';
import { RepositorioEliminarProductos } from '@Repositorios/Productos/repositorioEliminarProductos';

/**
 * * Hook para eliminar productos.
 * * @param {array} idProducto
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */
export function useEliminarProductos() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsProductos, urlsImagenes) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarProductos.eliminarProducto(idsProductos, urlsImagenes);
      setMensaje(mensaje);
    } catch (err) {
      setMensaje('');
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { eliminar, mensaje, cargando, error };
}
