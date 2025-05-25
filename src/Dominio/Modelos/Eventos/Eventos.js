export class Evento {

  /**
   * Clase que representa un evento.
   * 
   * @constructor
   * @param {Object} params - Parámetros del evento.
   * @param {int} params.idEvento - ID del evento.
   * @param {int} params.idCliente - ID del cliente asociado al evento.
   * @param {string} params.nombre - Nombre del evento.
   * @param {string} params.descripcion - Descripción del evento.
   * @param {float} params.puntos - Puntos asociados al evento.
   * @param {float} params.multiplicador - Multiplicador de puntos del evento.
   * @param {string} params.periodoRenovacion - Periodo de renovación del evento.
   * @param {bool} params.renovacion - Indica si el evento es renovable.
   */
  constructor({ idEvento = 0, idCliente = 0, nombre = '', descripcion = '', puntos = 0, multiplicador = 0, periodoRenovacion = '', renovacion = false }) {
    this.idEvento = idEvento;
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.multiplicador = multiplicador;
    this.periodo = periodoRenovacion;
    this.renovacion = renovacion;
  }
}
