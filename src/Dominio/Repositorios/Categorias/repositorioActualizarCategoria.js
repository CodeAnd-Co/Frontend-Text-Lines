// RF48 Actualizar Categoría - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarCategoria {
  static async actualizar(idCategoria, cambios) {
    try {
      const respuesta = await axios.put(
        `${RUTAS_API.CATEGORIAS.ACTUALIZAR}/${idCategoria}`,
        cambios,
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar la categoría';
      throw new Error(mensaje);
    }
  }
}