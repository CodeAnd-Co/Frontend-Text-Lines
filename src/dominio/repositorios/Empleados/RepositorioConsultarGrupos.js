//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';
import { ListaGrupoEmpleados } from '../../modelos/Empleados/ListaGrupoEmpleados';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarGrupos {
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
