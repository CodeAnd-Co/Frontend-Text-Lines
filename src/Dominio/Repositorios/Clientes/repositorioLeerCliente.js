import axios from 'axios';
import { ClienteLectura } from '@Modelos/Clientes/ClienteLectura';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioClientes {
  /**
   * Consulta los datos de un cliente específico por ID
   * @param {number} idCliente - ID del cliente a consultar
   * @returns {Promise<{cliente: ClienteLectura, mensaje: string}>}
   *
   * @see [RF[13] Leer cliente - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF13)
   */
  static async obtenerPorId(idCliente) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CLIENTES.CONSULTAR_CLIENTE,
        { idCliente },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      const { cliente, mensaje } = respuesta.data;

      const clienteInstancia = new ClienteLectura(cliente);

      return {
        cliente: clienteInstancia,
        mensaje,
      };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener datos del cliente.';
      throw new Error(mensaje);
    }
  }
}
