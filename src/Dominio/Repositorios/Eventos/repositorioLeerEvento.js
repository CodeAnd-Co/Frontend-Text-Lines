import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import { EventoLectura } from '@SRC/Dominio/Modelos/Eventos/EventoLectura';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioLeerEvento {
  /**
   * Consulta los datos de un evento específico por ID
   * @param {number} idEvento - ID del evento a consultar
   * @returns {Promise<{evento: EventoLectura, mensaje: string}>}
   *
   * @see [RF[38] Leer evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38)]
   */

  static async obtenerPorId(idEvento) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EVENTOS.CONSULTAR_EVENTO,
        { idEvento },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      const { evento, mensaje } = respuesta.data;

      const eventoInstancia = new EventoLectura(evento);

      return {
        evento: eventoInstancia,
        mensaje,
      };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener datos del evento.';
      throw new Error(mensaje);
    }
  }
}
