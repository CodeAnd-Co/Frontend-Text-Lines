// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30
import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

/**
 * Repositorio para eliminar productos.
 *
 * @param {Array<number>} idsProducto - Array de IDs de productos a eliminar.
 * @returns {Promise<object>} Respuesta del servidor.
 */
export const repositorioEliminarProductos = async (idsProducto) => {
  const respuesta = await axios.delete(
    RUTAS_API.PRODUCTOS.ELIMINAR_PRODUCTO,
    {
      data: { ids: idsProducto },
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
      withCredentials: true,
    }
  );
  return respuesta.data;
};