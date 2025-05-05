import axios from 'axios';
import { ListaClientes } from '@SRC/Dominio/Modelos/Clientes/ListaClientes';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaClientes {
  /**
   * Obtiene la lista de clientes desde la API
   * @returns {Promise<{clientes: Cliente[], mensaje: string}>}
   */
  static async obtenerLista() {
    try {
      const respuesta = await axios.get(RUTAS_API.CLIENTES.CONSULTAR_LISTA, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });

      return new ListaClientes(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener clientes';
      throw new Error(mensaje);
    }
  }
}
