import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaCuotas {
  static async obtenerLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CUOTAS.CONSULTAR_LISTA,
        {},
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener cuotas';
      throw new Error(mensaje);
    }
  }
}
