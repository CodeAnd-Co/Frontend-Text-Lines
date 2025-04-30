import { Evento } from './Eventos';

export class ListaEventos {
  constructor({ mensaje, listaEventos }) {
    this.mensaje = mensaje;
    this.eventos = Array.isArray(listaEventos)
      ? listaEventos.map((evento) => new Evento(evento))
      : [];
  }
}
