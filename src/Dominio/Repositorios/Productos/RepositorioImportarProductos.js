import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import ProductoCompleto from '@Modelos/Productos/ProductoCompleto';
import Variante from '@Modelos/Productos/Variante';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioImportarProductos {
  /**
   * Recibe un arreglo de objetos `{ productoRaw, variantesRaw }`,
   * los convierte en instancias de ProductoCompleto y Variante, 
   * y los envía al backend como JSON para importación masiva.
   *
   * @param {Array<{ productoRaw: Object, variantesRaw: Array<Object> }>} productosParseados
   * @returns {Promise<Object>} Respuesta del backend
   */
  static async importarProductos(productosParseados) {
    const productosConvertidos = productosParseados.map(({ productoRaw, variantesRaw }) => ({
      producto: new ProductoCompleto(productoRaw),
      variantes: variantesRaw.map((va) => new Variante(va)),
    }));

    try {
    
      const respuesta = await axios.post(RUTAS_API.PRODUCTOS.IMPORTAR, productosConvertidos, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al importar productos desde CSV';
      throw new Error(mensaje);
    }
  }
}
