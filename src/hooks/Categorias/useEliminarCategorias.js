//RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50

import { useEffect, useState } from 'react';
import { RepositorioEliminarCategorias } from '../../Dominio/repositorios/Categorias/repositorioEliminarCategorias';

/**
 * Hook para eliminar una o más categorías.
 * @param {array} idsCategoria
 * @return {{
 *  mensaje: string,
 *  cargando: boolean,
 *  error: string | null,
 * }}
 */

export function useEliminarCategorias(idsCategoria) {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const eliminarCategoria = async () => {
      setCargando(true);
      setError(null);

      try {
        const { mensaje } = await RepositorioEliminarCategorias.eliminarCategoria(idsCategoria);
        setMensaje(mensaje);
      } catch (err) {
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (Array.isArray(idsCategoria) && idsCategoria.length > 0) {
      eliminarCategoria();
    }
  }, [idsCategoria]);

  return { mensaje, cargando, error };
}
