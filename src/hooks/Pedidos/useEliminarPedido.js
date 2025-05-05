//RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import { useEffect, useState } from 'react';
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

export function useEliminarPedido(idsPedidos) {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eliminarPedido = async () => {
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

    if (Array.isArray(idsPedidos) && idsPedidos.length > 0) {
      eliminarPedido();
    }
  }, [idsPedidos]);

  return { mensaje, cargando, error };
}
