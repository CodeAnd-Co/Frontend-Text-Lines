import axios from 'axios';
import { listaSetsProductos } from '../../modelos/SetsProductos/listaSetsProductos';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarSetsProductos {
  /**
   * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
   * Obtiene la lista de sets de productos desde la API
   * agregar comentarios  */
  static async obtenerLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.SETS_PRODUCTOS.CONSULTAR_LISTA,
        {},
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );
      return listaSetsProductos(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener sets de productos';
      throw new Error(mensaje);
    }
  }
}
