
import axios from 'axios';
import { ListaCuotas } from '../../modelos/Cuotas/ListaCuotas';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaCuotas{
  /**
   * Obtiene la lista de cuotas desde la API
   * @returns {Promise<{cuotas: Cuota[], mensaje: string}>}
   */
  static async obtenerLista() {
    try {
      const respuesta = await axios.get(RUTAS_API.CUOTAS.CONSULTAR_LISTA, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });

      return new ListaCuotas(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener cuotas';
      throw new Error(mensaje);
    }
  }
}