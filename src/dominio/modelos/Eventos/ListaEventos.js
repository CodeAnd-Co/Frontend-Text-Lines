import { Evento } from './Evento.js';

export class ListaEventos {
  constructor({ mensaje, eventos }) {
    this.mensaje = mensaje;
    this.eventos = Array.isArray(eventos) ? eventos.map((evento) => new Evento(evento)) : [];
  }
}
