import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarTipoPago {
  static async actualizar(cambios) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.PAGOS.ACTUALIZAR_LISTA,
        { cambios },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar';
      throw new Error(mensaje);
    }
  }
}
