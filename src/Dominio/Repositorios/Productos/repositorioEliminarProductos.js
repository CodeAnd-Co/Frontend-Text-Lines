// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30

import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarProductos {
  /**
   * Elimina una o más productos desde la API
   * @param {array} idsProducto - ID de los productos a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarProducto(idsProducto) {
    try {
      const respuesta = await axios.delete(RUTAS_API.PRODUCTOS.ELIMINAR_PRODUCTO, {
        data: { ids: idsProducto },
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar los productos';
      throw new Error(mensaje);
    }
  }
}