import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioObtenerOpcionesCuotas {
  static async obtenerOpciones(idCliente) {
    try {
      console.log('🔍 Solicitando opciones para cliente:', idCliente);
      
      const respuesta = await axios.get(
        `${RUTAS_API.CUOTAS.OBTENER_OPCIONES}?idCliente=${idCliente}`,
        {
          headers: { 'x-api-key': API_KEY },
          withCredentials: true,
        }
      );
      
      console.log('🔍 Respuesta del backend - opciones:', respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error('❌ Error en repositorio opciones:', error);
      const mensaje = error.response?.data?.mensaje || 'Error al obtener opciones de productos.';
      throw new Error(mensaje);
    }
  }
}