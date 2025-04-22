// RepositorioSeleccionarCliente.js
import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioSeleccionarCliente {
  static async seleccionarCliente(idCliente) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CLIENTES.CONSULTAR_SISTEMA,
        { idCliente },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return respuesta.data.mensaje;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al seleccionar cliente';
      throw new Error(mensaje);
    }
  }
}
