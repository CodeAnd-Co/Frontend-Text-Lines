//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarRol {
  /**
   * Elimina un set de productos desde la API
   * @param {array} idsRol- ID del set de productos a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarRol(idsRol) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.ROLES.ELIMINAR_ROL,
        { idsRol },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar el set de productos';
      throw new Error(mensaje);
    }
  }
}
