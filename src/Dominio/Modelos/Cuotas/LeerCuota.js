/*
Modelo de dominio para la lectura de una cuota.
RF[33] - Leer cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33]
*/

export class LeerCuota {
  constructor({ idCuota, nombre, descripcion, productos = [], cuotas = [] }) {
    this.idCuota = idCuota;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.productos = productos;
    this.cuotas = cuotas;
  }
}
