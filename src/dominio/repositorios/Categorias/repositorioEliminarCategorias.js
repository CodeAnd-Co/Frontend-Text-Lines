//RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50

import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarCategorias {
  /**
   * Elimina una o más categorías de productos desde la API
   * @param {array} idsCategoria - ID de la categoría o categorías a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarCategoria(idsCategoria) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CATEGORIAS.ELIMINAR_CATEGORIA,
        { idsCategoria },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar las o la categoría';
      throw new Error(mensaje);
    }
  }
}
