export class Evento {
  constructor({ idEvento, nombre, descripcion, puntos, periodo, renovacion }) {
    this.idEvento = idEvento;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.periodo = periodo;
    this.renovacion = renovacion;
  }
}
