import axios from 'axios';
import { GrupoEmpleadosLectura } from '@Modelos/Empleados/GrupoEmpleadosLectura';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioLeerGrupoEmpleados {
  /**
   * Consulta los datos de un grupo de empleados específico por ID
   * @param {number} idGrupo - ID del grupo de empleados a consultar
   * @returns {Promise<{grupoEmpleados: GrupoEmpleadosLectura, mensaje: string}>}
   *
   * @see [RF[23] Leer grupo de empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23)
   */
  static async obtenerPorId(idGrupo) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EMPLEADOS.LEER_GRUPO,
        { idGrupo },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      const { grupoEmpleados, mensaje } = respuesta.data;

      const grupoEmpleadosInstancia = new GrupoEmpleadosLectura(grupoEmpleados);

      return {
        grupoEmpleados: grupoEmpleadosInstancia,
        mensaje,
      };
    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje || 'Error al obtener datos del grupo de empleados.';
      throw new Error(mensaje);
    }
  }
}
