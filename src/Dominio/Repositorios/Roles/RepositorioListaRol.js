//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import axios from 'axios';
import { listaRoles } from '@SRC/Dominio/Modelos/Roles/ListaRoles';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaRol {
  /**
   * Obtiene la lista de roles desde la API
   * @param void
   * @returns {Promise<{roles: Rol[], mensaje: string}>}
   */
  static async obtenerLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.ROLES.CONSULTAR_LISTA,
        {}, // cuerpo vacío
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return listaRoles(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener roles';
      throw new Error(mensaje);
    }
  }
}
