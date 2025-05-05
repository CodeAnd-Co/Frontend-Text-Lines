//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import axios from 'axios';
import { ListaProductos } from '@SRC/Dominio/Modelos/Productos/ListaProductos';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaProductos {
  /**
   * Obtiene la lista de productos desde la API
   * @param void
   * @returns {Promise<{productos: Producto[], mensaje: string}>}
   */
  static async obtenerLista() {
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
      return new ListaProductos(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener productos';
      throw new Error(mensaje);
    }
  }
}
