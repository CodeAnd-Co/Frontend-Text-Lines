// RF49 - Actualizar Categoría - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49]
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Repositorio para actualizar una categoría en el sistema.
 *
 * RF49 - Actualizar Categoría
 * @see https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49
 */
export class RepositorioActualizarCategoria {
  /**
   * Envía una solicitud PUT al backend para actualizar una categoría.
   *
   * @param {number} idCategoria - ID de la categoría a actualizar.
   * @param {object} datosCategoria - Datos nuevos de la categoría.
   * @returns {Promise<object>} - Respuesta del servidor.
   * @throws {Error} - Si ocurre un error durante la petición.
   */
  static async actualizar(idCategoria, datosCategoria) {
    try {
      const respuesta = await axios.put(
        `${RUTAS_API.CATEGORIAS.ACTUALIZAR}/${idCategoria}`,
        datosCategoria,
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar la categoría';
      throw new Error(mensaje);
    }
  }
}