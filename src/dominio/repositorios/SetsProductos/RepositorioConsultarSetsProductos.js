import axios from 'axios';
import { listaSetsProductos } from '../../modelos/SetsProductos/listaSetsProductos';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarSetsProductos {
  /**
   * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos -
   * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
   *
   * Obtiene la lista de sets de productos desde la API y la convierte en instancias del modelo SetProductos.
   *
   * @returns {Promise<{setsProductos: SetProductos[], mensaje: string}>}
   *  - `setsProductos`: Lista de objetos de tipo SetProductos, que representan los sets de productos obtenidos.
   *  - `mensaje`: Mensaje de la respuesta de la API, que puede ser un error o un mensaje de éxito.
   *
   * @throws {Error} Si ocurre algún error durante la consulta o al procesar la respuesta de la API.
   */
  static async obtenerLista() {
    try {
      // Realiza la consulta POST a la API para obtener los sets de productos
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

      // Verificación de la respuesta para asegurarse de que contiene los datos esperados
      if (!respuesta.data || !respuesta.data.setsProductos) {
        throw new Error('Respuesta de la API no contiene los datos esperados');
      }

      // Llama a la función para convertir la respuesta en instancias de SetProductos
      return listaSetsProductos(respuesta.data);
    } catch (error) {
      // Manejo de errores si ocurre un fallo durante la consulta o el procesamiento
      console.log('error..');
      const mensaje = error.response?.data?.mensaje || 'Error al obtener sets de productos.';
      throw new Error(mensaje);
    }
  }
}
