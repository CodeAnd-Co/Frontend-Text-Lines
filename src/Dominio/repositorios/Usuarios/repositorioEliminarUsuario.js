//RF05 Super Administrador Elimina Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF5

import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarUsuarios {
  /**
   * Elimina a uno o varios usuarios del sistema desde la API
   * @param {Object} seleccion - Objeto con el type e ids usuarios a eliminar
   * @returns {Promise<{mensaje: string}>} - Mensaje de éxito o error
   */
  static async eliminarUsuarios(seleccion) {
    try {
      const idsArray = Array.isArray(seleccion.ids)
        ? seleccion.ids
        : Array.from(seleccion.ids || []);

      const respuesta = await axios.post(
        RUTAS_API.USUARIOS.ELIMINAR_USUARIOS,
        {
          ids: idsArray,
        },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar usuarios';
      throw new Error(mensaje);
    }
  }
}
