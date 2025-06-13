import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearSetsProducto {
  static async crearSetsProducto(nuevoSetsProductos) {
    try{
      const respuesta = await axios.post(
        RUTAS_API.SETS_PRODUCTOS.CREAR_SETS_PRODUCTOS,
        {nuevoSetsProductos},
        {
          headers: {
            'x-api-key': API_KEY
          },
          withCredentials: true
        }
      );
      return respuesta
    }catch(error){
      throw new Error(error.response?.data?.mensaje || 'Error de conexion, intentalo de nuevo mas tarde.')
    }
  }
}