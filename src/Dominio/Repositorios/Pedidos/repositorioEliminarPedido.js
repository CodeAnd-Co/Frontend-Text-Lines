//RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarPedido {
  /**
   * Elimina uno o más pedidos desde la API
   * @param {array} idsPedidos - Arreglo de ids de los pedidos a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarPedido(idsPedido) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.PEDIDOS.ELIMINAR_PEDIDO,
        { idsPedido },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar el pedido';
      throw new Error(mensaje);
    }
  }
}
