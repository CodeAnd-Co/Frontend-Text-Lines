import axios from "axios";
import { ListaCategorias } from "../../modelos/Categorias/ListaCategorias";
import { RUTAS_API } from "../../../Utilidades/Constantes/rutasAPI";

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioListaCategorias {
  /**
   * Obtiene la lista de categorías desde la API
   * @param {Object} filtros - Parámetros opcionales como { limit, offset }
   * @returns {Promise<{categorias: Categoria[], mensaje: string}>}
   */
  async obtenerLista({ limit = 10, offset = 0 } = {}) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CATEGORIAS.CONSULTAR_LISTA,
        { limit, offset },
        {
          withCredentials: true,
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      return ListaCategorias(respuesta.data);

    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje || "Error al obtener categorías";
      throw new Error(mensaje);
    }
  }
}