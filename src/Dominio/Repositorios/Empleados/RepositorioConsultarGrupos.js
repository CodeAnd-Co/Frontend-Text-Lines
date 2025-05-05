//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';
import { ListaGrupoEmpleados } from '../../Modelos/Empleados/ListaGrupoEmpleados';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarGrupos {
  /**
   * Obtiene la lista de gurpos de empleados desde la API
   * @param void
   * @returns {Promise<{grupoEmpleados: GrupoEmpleados[], mensaje: string}>}
   */
  static async consultarGrupos() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EMPLEADOS.CONSULTAR_GRUPOS,
        {},
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return new ListaGrupoEmpleados(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al consultar grupos de empleados';
      throw new Error(mensaje);
    }
  }
}
