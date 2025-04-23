import axios from 'axios';

import { listaRoles } from '../../modelos/Roles/ListaRoles';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaRoles {
  static async obtenerLista({ limit = 10, offset = 0 } = {}) {
    try {
        const respuesta = await axios.post(
            RUTAS_API.ROLES.CONSULTAR_LISTA,
            { limit, offset },
            {
              withCredentials: true,
              headers: {
                'x-api-key': API_KEY,
              },
            }
          );
          
          console.log('Respuesta cruda del backend:', respuesta.data);
          
      return listaRoles(
        respuesta.data.roles
          ? { mensaje: respuesta.data.mensaje, roles: respuesta.data.roles }
          : {}
      );
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener roles';
      throw new Error(mensaje);
    }
  }
}