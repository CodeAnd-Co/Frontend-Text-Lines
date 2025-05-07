//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]

import { useState } from 'react';
import { RepositorioEliminarRol } from '@Repositorios/Roles/RepositorioEliminarRol';

/**
 * * Hook para eliminar un set de productos.
 * * @param {array} idsRol
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */

export function useEliminarRol() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsRol) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarRol.eliminarRol(idsRol);
      console.log(mensaje);
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
