import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Servicio para obtener la lista de productos disponibles para categorías.
 * 
 * RF49 - Actualizar Categoría
 * @returns {Promise<Array<{id: number, nombre: string}>>} Lista formateada de productos.
 */
const obtenerProductosCategoria = async () => {
  try {
    const respuesta = await axios.post(
      RUTAS_API.PRODUCTOS.CONSULTAR_LISTA,
      {},
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );

    const productosCrudos = respuesta?.data?.listaProductos || [];

    const productosFormateados = productosCrudos.map((producto) => ({
      id: producto.idProducto,
      nombre: producto.nombreComun,
    }));

    return productosFormateados;
  } catch {
    return [];
  }
};

export default obtenerProductosCategoria;