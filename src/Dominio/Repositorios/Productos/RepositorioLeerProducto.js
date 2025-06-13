import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI.js';
import { InfoProducto } from '@Modelos/Productos/InfoProducto.js';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioLeerProducto {
  static async obtenerPorId(idProducto) {
    try {
      const respuesta = await axios.get(RUTAS_API.PRODUCTOS.LEER_PRODCUTO, {
        headers: {
          'x-api-key': API_KEY
        },
        withCredentials: true,
        params: {
          idProducto
        }
      });

      const { infoProducto } = respuesta.data;

      // Asegurarse de que existe y tiene al menos un elemento
      if (!infoProducto || !Array.isArray(infoProducto) || infoProducto.length === 0) {
        throw new Error('No se encontró información del producto.');
      }

      return new InfoProducto(infoProducto[0]);
    } catch (error) {
      throw new Error(error.response?.data?.mensaje || 'Error al obtener datos del producto.');
    }
  }
}
