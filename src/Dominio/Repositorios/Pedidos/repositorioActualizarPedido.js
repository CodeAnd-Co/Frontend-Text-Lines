import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarPedido {
  static async actualizarPedido(pedido) {
    const config = {
      headers: {
        'x-api-key': API_KEY,
      },
    };

    try {
      const respuesta = await axios.put(
        RUTAS_API.PEDIDOS.ACTUALIZAR_PEDIDO,
        pedido, // <--- aquí se manda directamente el objeto plano
        config
      );

      return respuesta.data;
    } catch (error) {
      console.error('❌ Error al actualizar el pedido:', error);
      return null;
    }
  }
}
