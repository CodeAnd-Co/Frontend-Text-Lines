import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarSetProductos {
  /**
   * Actualiza los datos de un set de productos específico
   * @param {number} idSet - ID del set de productos a actualizar
   * @param {string} nombre - Nuevo nombre del set
   * @param {string} descripcion - Nueva descripción del set
   * @param {array} productos - Lista de IDs de productos
   * @returns {Promise<{mensaje: string}>}
   *
   * @see [RF44] Actualizar set de productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44
   */
  static async actualizarSetProductos(idSet, nombre, activo, descripcion, productos) {
    try {
      const respuesta = await axios.put(
        `${RUTAS_API.SETS_PRODUCTOS.ACTUALIZAR_SETS_PRODUCTO}`,
        {
          idSetProducto: idSet,
          nombre,
          activo,
          descripcion,
          productos,
        },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return respuesta;
    } catch (error) {
      if (error.response?.data?.mensaje) {
        throw new Error(error.response.data.mensaje);
      }
      throw error;
    }
  }
}
