import axios from 'axios';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';
import { ListaPedidos } from '../../modelos/Pedidos/ListaPedidos';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarPedidos {
  static async consultarPedidos() {
    try {
      const respuesta = await axios.get(RUTAS_API.PEDIDOS.CONSULTAR_LISTA, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });
      return new ListaPedidos(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje;
      throw new Error(mensaje);
    }
  }
}
