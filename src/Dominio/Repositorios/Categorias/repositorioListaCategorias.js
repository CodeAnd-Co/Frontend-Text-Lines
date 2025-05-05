import axios from 'axios';
import { listaCategorias } from '../../Modelos/Categorias/ListaCategorias';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaCategorias {
  /**
   * Obtiene la lista de categorías desde la API
   * @returns {Promise<{categorias: Categoria[], mensaje: string}>}
   * @see [RF[47] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
   */
  static async obtenerLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CATEGORIAS.CONSULTAR_LISTA,
        {},
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return listaCategorias(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener categorías';
      throw new Error(mensaje);
    }
  }
}
