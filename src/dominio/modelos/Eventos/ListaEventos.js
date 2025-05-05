import { Evento } from '@Eventos';

export class ListaEventos {
  constructor({ mensaje, listaEventos }) {
    this.mensaje = mensaje;
    const arr = listaEventos || [];
    this.eventos = Array.isArray(arr) ? arr.map((evento) => new Evento(evento)) : [];
  }
}
