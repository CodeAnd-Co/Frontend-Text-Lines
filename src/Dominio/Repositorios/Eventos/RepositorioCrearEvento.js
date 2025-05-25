// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import { Evento } from '@Dominio/Modelos/Eventos/Eventos';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearEvento {
  /**
   * Crea un nuevo evento en la API
   * @param {Evento} evento - El evento a crear
   * @returns {Promise<{evento: Evento, mensaje: string}>}
   */
  static async crearEvento(evento) {

    const body = {
      idCliente: evento.idCliente,
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      puntos: evento.puntos,
      multiplicador: evento.multiplicador,
      periodoRenovacion: evento.periodoRenovacion,
      renovacion: evento.renovacion,
    }

    console.log('Cuerpo de la solicitud:', body);

    try {
      const respuesta = await axios.post(RUTAS_API.EVENTOS.CREAR_EVENTO, body, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });
      return new Evento(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al crear el evento';
      throw new Error(mensaje);
    }
  }
}
