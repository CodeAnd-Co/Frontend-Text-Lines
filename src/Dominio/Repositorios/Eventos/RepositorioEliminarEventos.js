//RF[40] Elimina evento - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarEvento {
  /**
   * Elimina un evento desde la API
   * @param {array} idsEvento - ID del evento a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarEventos(idsEvento) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EVENTOS.ELIMINAR_EVENTO,
        { idsEvento },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar el evento';
      throw new Error(mensaje);
    }
  }
}
