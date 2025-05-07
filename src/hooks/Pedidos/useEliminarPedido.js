//RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import { useState } from 'react';
import { RepositorioEliminarPedido } from '@Repositorios/Pedidos/repositorioEliminarPedido';

/**
 * * Hook para eliminar uno o más pedidos.
 * * @param {array} idsPedidos
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */

export function useEliminarPedido() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsPedidos) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarPedido.eliminarPedido(idsPedidos);
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
