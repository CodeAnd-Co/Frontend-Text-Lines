import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearCategoria {
  static async crearCategoria(categoria) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CATEGORIAS.CREAR,
        { categoria },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return respuesta;
    } catch (error) {
      throw new Error(error.response.data.mensaje);
    }
  }
}
