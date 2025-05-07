//RF20 Eliminar empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarEmpleado {
  /**
   * Eliminar empleados desde la API
   * @param {array} idsEmpleado - ID del empleado a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarEmpleados(idsEmpleado) {
    try {
      const respuesta = await axios.delete(RUTAS_API.EMPLEADOS.ELIMINAR_EMPLEADO, {
        data: { idsEmpleado }, // Usa "data" para enviar el cuerpo
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar los empleados';
      throw new Error(mensaje);
    }
  }
}
