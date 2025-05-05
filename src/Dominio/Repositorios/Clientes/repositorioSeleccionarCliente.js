// RepositorioSeleccionarCliente.js
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioSeleccionarCliente {
  /**
   * Selecciona un cliente en el sistema.
   *
   * @param {number} idCliente - Identificador del cliente a seleccionar.
   * @returns {Promise<string>} Mensaje de éxito o error.
   * @throws {Error} Si ocurre un error al seleccionar el cliente.
   */
  static async seleccionarCliente(idCliente) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CLIENTES.CONSULTAR_SISTEMA,
        { idCliente },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return respuesta.data.mensaje;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al seleccionar cliente';
      throw new Error(mensaje);
    }
  }
}
