export class Evento {
  constructor({ idEvento, nombre, descripcion, puntos, periodoRenovacion, renovacion }) {
    this.idEvento = idEvento;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.periodo = periodoRenovacion;
    this.renovacion = renovacion;
  }
}
