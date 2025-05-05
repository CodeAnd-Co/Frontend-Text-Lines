import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Repositorio para eliminar un cliente.
 *
 * @param {number} idCliente - ID del cliente a eliminar.
 * @returns {Promise<object>} Respuesta del servidor.
 * @throws {Error} Si ocurre un error al eliminar el cliente.
 * @see [RF15 - Elimina Cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15)
 *
 */
export const repositorioEliminarCliente = async (idCliente) => {
  try {
    const respuesta = await axios.post(
      RUTAS_API.CLIENTES.ELIMINAR_CLIENTE,
      { idCliente },
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );
    return respuesta.data;
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al eliminar cliente';
    throw new Error(mensaje);
  }
};
