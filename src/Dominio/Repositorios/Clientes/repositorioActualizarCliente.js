import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarCliente {
  static async actualizarClienteConImagen(nuevosDatosCliente) {
    if (!nuevosDatosCliente) {
      return;
    }
    try {
      console.log(nuevosDatosCliente);
      const respuesta = await axios.put(
        RUTAS_API.CLIENTES.ACTUALIZAR_CLIENTE,
        { nuevosDatosCliente },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      console.log(respuesta);
    } catch (error) {
      console.log(error);
      throw new Error('Error en el repositorio');
    }
  }
}
