import { useState } from 'react';
import { RepositorioActualizarPedido } from '@Dominio/Repositorios/Pedidos/repositorioActualizarPedido';

export const useActualizarPedido = () => {
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const actualizarPedido = async (pedido) => {
    if (!pedido || !pedido.idPedido) {
      setError(true);
      setMensaje('Datos del pedido incompletos');
      return { exito: false, mensaje: 'Datos del pedido incompletos' };
    }

    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');
    try {
      const respuesta = await RepositorioActualizarPedido.actualizarPedido(pedido);
      setExito(true);
      setMensaje(respuesta.data.mensaje || 'Pedido actualizado correctamente');
      return {
        exito: true,
        mensaje: respuesta.data.mensaje || 'Pedido actualizado correctamente',
        data: respuesta,
      };
    } catch (error) {
      setExito(false);
      setError(true);
      const mensajeError = error.message || 'Error al actualizar el pedido';
      setMensaje(mensajeError);
      return { exito: false, mensaje: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  return { actualizarPedido, cargando, exito, error, mensaje, setError };
};

export default useActualizarPedido;
