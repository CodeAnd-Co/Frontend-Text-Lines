import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarCuota {
  static async actualizarSetCuotas(datosActualizacion) {
    try {
      const respuesta = await axios.put(
        RUTAS_API.CUOTAS.ACTUALIZAR_SET_CUOTAS,
        datosActualizacion,
        {
          headers: { 'x-api-key': API_KEY },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al actualizar el set de cuotas.';
      throw new Error(mensaje);
    }
  }
}