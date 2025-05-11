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
      // await axios.put(
      //   RUTAS_API.CLIENTES.ACTUALIZAR_CLIENTE,
      //   { imagenData },
      //   {
      //     headers: {
      //       'x-api-key': API_KEY,
      //     },
      //   }
      // );
    } catch {
      throw new Error('Error en el repositorio');
    }
  }
}
