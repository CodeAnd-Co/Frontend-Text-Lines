//RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import { ListaEventos } from '@SRC/Dominio/Modelos/Eventos/ListaEventos';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarEventos {
  /**
   * Obtiene la lista de eventos desde la API
   * @param void
   * @returns {Promise<{eventos: Evento[], mensaje: string}>}
   */
  static async consultarLista() {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EVENTOS.CONSULTAR_LISTA,
        {},
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return new ListaEventos(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al consultar los eventos';
      throw new Error(mensaje);
    }
  }
}
