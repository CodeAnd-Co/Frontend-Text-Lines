import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarPedido {
  /**
   * * Actualiza los datos de un pedido específico
   * @param {Object} pedido - Objeto que contiene los datos del pedido a actualizar
   * @returns {Promise<{mensaje: string}>}
   *
   * @see [RF[62] Actualizar pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF62)]
   */
  static async actualizarPedido(pedido) {
    console.log('[DEBUG] RepositorioActualizarPedido - Pedido a actualizar:', pedido);
    try {
      const respuesta = await axios.put(
        `${RUTAS_API.PEDIDOS.ACTUALIZAR_PEDIDO}`,
        {
          idPedido: pedido.idPedido,
          estado: pedido.estado,
          precioTotal: pedido.precioTotal,
          idEnvio: pedido.idEnvio,
          idPago: pedido.idPago,
        },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta;
    } catch (error) {
      console.error('[Error RepositorioActualizarPedido]:', error.response?.data || error.message);

      // Lanzar el error con el mensaje del backend si existe
      if (error.response?.data?.mensaje) {
        throw new Error(error.response.data.mensaje);
      }
      // Si no hay mensaje del backend, lanzar el error original
      throw error;
    }
  }
}
