/*
Modelo de dominio para la lectura de una cuota.
RF[33] - Leer cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33]
*/

export class LeerCuota {
  constructor({
    idCuota,
    nombre,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada,
    ultimaActualizacion,
  }) {
    this.idCuota = idCuota;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.periodoRenovacion = periodoRenovacion;
    this.renovacionHabilitada = renovacionHabilitada;
    this.ultimaActualizacion = ultimaActualizacion;
  }
}
