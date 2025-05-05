//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';
import { ListaEmpleados } from '@Modelos/Empleados/ListaEmpleados';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarEmpleados {
  /**
   * Obtiene la lista de empleados desde la API
   * @param void
   * @returns {Promise<{empleados: Empleado[], mensaje: string}>}
   */
  static async consultarLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EMPLEADOS.CONSULTAR_LISTA,
        {},
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return new ListaEmpleados(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al consultar los empleados';
      throw new Error(mensaje);
    }
  }
}
