import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioVerificar2FA {
  static async verificar({ idUsuario, codigo }) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.AUTENTICACION.VERIFICAR_2FA,
        {     
            idUsuario: Number(idUsuario), 
            codigo: codigo.trim() 
        },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return respuesta.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.mensaje || 'Error al verificar el código 2FA'
      );
    }
  }
}