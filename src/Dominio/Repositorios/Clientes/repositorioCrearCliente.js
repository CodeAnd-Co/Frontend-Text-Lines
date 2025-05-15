import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearCliente {
  static async crearCliente(cliente) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CLIENTES.CREAR_CLIENTE,
        { cliente },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return respuesta;
    } catch (error) {
      const mensaje = error.respuesta?.data?.mensaje;
      throw new Error(mensaje);
    }
  }
}
