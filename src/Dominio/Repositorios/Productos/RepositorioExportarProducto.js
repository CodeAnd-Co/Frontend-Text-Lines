import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Solicita la exportación de productos seleccionados al backend y retorna el contenido.
 *
 * @param {number[]} idsProducto - Arreglo de IDs de productos seleccionados para exportar.
 * @returns {Promise<Blob>} Contenido binario del archivo.
 * @throws {Error} Si la petición falla o el servidor devuelve un mensaje de error.
 * @see [RF58 - Exportar Productos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58)
 */
export const exportarProductos = async (idsProducto) => {
  try {
    const respuesta = await axios.post(
      RUTAS_API.PRODUCTOS.EXPORTAR_PRODUCTOS,
      { idsProducto },
      {
        withCredentials: true,
        responseType: 'blob',
        headers: { 'x-api-key': API_KEY },
      }
    );
    return respuesta.data;
  } catch (error) {
    throw new Error(error.respuesta?.data?.mensaje || 'Error al exportar productos en el servidor');
  }
};
