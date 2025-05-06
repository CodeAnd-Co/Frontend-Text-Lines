//RF25 Eliminar Grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarGrupoEmpleados {
  /**
   * Elimina un grupo de empleados desde la API
   * @param {array} idsGrupo - ID del grupo a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarGrupoEmpleados(idsGrupo) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EMPLEADOS.ELIMINAR_GRUPO,
        { idsGrupo },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar el grupo de empleados';
      throw new Error(mensaje);
    }
  }
}