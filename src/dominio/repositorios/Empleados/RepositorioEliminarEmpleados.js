// RF[20] Eliminar empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarEmpleados {
  /**
   * Elimina uno o más empleados desde la API
   * @param {array} idsEmpleado - IDs de empleados a eliminar
   * @returns {Promise<{mensaje: string}>}
   */
  static async eliminarEmpleado(idsEmpleado) {
    try {
      console.log('Payload sent to API:', idsEmpleado); // Debugging
      const respuesta = await axios.delete(RUTAS_API.EMPLEADOS.ELIMINAR_EMPLEADO, {
        data: { idsEmpleado },
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al eliminar empleados';
      console.error('Error response from API:', error.response?.data); // Debugging
      throw new Error(mensaje);
    }
  }
}