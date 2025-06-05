import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarSetProducto {
  static async actualizar(formData) {
    if (!formData) return;

    try {
      await axios.put(RUTAS_API.SETS_PRODUCTOS.ACTUALIZAR_SETS_PRODUCTO, formData, {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
    } catch (error) {
      throw new Error(
        error.response.data.mensaje || 'Ocurrió un error al actualizar el set de producto.'
      );
    }
  }
}
