import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarCliente {
  static async actualizarClienteConImagen(formData) {
    if (!formData) return;

    try {
      const respuesta = await axios.put(RUTAS_API.CLIENTES.ACTUALIZAR_CLIENTE, formData, {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error en el repositorio');
    }
  }
}
