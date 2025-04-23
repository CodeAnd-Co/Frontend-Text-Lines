import axios from 'axios';
import { ListaUsuarios } from '../../modelos/Usuarios/ListaUsuarios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarListaUsuarios {
  /**
   * Obtiene la lista de usuarios desde la API
   * @param {Object} filtros - Parámetros opcionales como { limit, offset }
   * @returns {Promise<{usuarios: Usuario[], mensaje: string}>}
   */
  async obtenerLista({ limit = 10, offset = 0 } = {}) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.USUARIOS.CONSULTAR_LISTA,
        { limit, offset },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return ListaUsuarios(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener la lista de usuarios';
      throw new Error(mensaje);
    }
  }
}
