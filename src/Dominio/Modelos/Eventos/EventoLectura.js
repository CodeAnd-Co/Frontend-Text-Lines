/*
 * Modelo de dominio para lectura de eventos
 * RF[38] - Leer evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38]
 */

export class EventoLectura {
  constructor({ idEvento, nombre, descripcion, puntos, periodoRenovacion, renovacion, estatus }) {
    this.idEvento = idEvento;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.periodoRenovacion = periodoRenovacion;
    this.renovacion = renovacion;
    this.estatus = estatus;
  }
}
