import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarGrupoEmpleados {
  /**
   * * Actualiza los datos de un grupo de empleados específico
   * @param {number} idGrupo - ID del grupo de empleados a actualizar
   * @param {string} nombre - Nuevo nombre del grupo de empleados
   * @param {string} descripcion - Nueva descripción del grupo de empleados
   * @param {array} empleados - Lista de IDs de empleados a agregar al grupo
   * @param {array} setsDeProductos - Lista de IDs de sets de productos a agregar al grupo
   * @returns {Promise<{mensaje: string}>}
   *
   * @see [RF[24] Actualizar grupo de empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24)
   */
  static async actualizarGrupoEmpleados(idGrupo, nombre, descripcion, empleados, setsDeProductos) {
    try {
      const respuesta = await axios.put(
        `${RUTAS_API.EMPLEADOS.ACTUALIZAR_GRUPO}`,
        {
          idGrupoEmpleado: idGrupo,
          nombre,
          descripcion,
          empleados,
          setsDeProductos,
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
      if (error.response?.data?.mensaje) {
        throw new Error(error.response.data.mensaje);
      }
      throw error;
    }
  }
}
