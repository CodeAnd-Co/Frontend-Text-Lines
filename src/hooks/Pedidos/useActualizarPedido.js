import { useState } from 'react';
import { RepositorioActualizarPedido } from '@Dominio/Repositorios/Pedidos/repositorioActualizarPedido';

export const useActualizarPedido = () => {
  const [cargando, setCargando] = useState(false);

  const actualizarPedido = async (pedido) => {
    setCargando(true);
    try {
      const respuesta = await RepositorioActualizarPedido.actualizarPedido(pedido);
      return respuesta !== null;
    } catch {
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { actualizarPedido, cargando };
};