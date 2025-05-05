import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import { ListaProveedores } from '@Modelos/Proveedores/ListaProveedor';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarProveedores {
  /**
   * Obtiene la lista de proveedores desde la API
   * @param void
   * @returns {Promise<{proveedores: Proveedor[], mensaje: string}>}
   */
  static async consultarLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.PROVEEDORES.CONSULTAR_LISTA,
        {},
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      return new ListaProveedores(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al consultar los proveedores';
      throw new Error(mensaje);
    }
  }
}