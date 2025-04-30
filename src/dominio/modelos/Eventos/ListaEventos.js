import { Evento } from './Eventos';

export class ListaEventos {
  constructor({ mensaje, lista_eventos }) {
    this.mensaje = mensaje;
    this.eventos = Array.isArray(lista_eventos)
      ? lista_eventos.map((evento) => new Evento(evento))
      : [];
  }
}
