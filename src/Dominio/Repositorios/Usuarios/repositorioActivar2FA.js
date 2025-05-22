import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActivar2FA {
  static async activar({ idUsuario, nombre, correo }) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.AUTENTICACION.ACTIVAR_2FA,
        { idUsuario, nombre, correo },
        {
          headers: { 'x-api-key': API_KEY },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensaje || 'Error al activar 2FA');
    }
  }
}