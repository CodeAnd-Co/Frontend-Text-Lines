import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarCliente {
  static async actualizarClienteConImagen(formData) {
    if (!formData) return;

    try {
      await axios.put(RUTAS_API.CLIENTES.ACTUALIZAR_CLIENTE, formData, {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      });
    } catch (error) {
      throw new Error(error.response.data.mensaje || 'Ocurrió un error al actualizar el cliente.');
    }
  }
}
