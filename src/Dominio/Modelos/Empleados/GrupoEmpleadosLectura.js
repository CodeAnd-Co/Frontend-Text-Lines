/*
 * Modelo de un grupo de empleados
 * RF[23] Lee grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 */

export class GrupoEmpleadosLectura {
  constructor({ idGrupo, nombre, descripcion, setsProductos = [], empleados = [] }) {
    this.idGrupo = idGrupo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.setsProductos = setsProductos;
    this.empleados = empleados;
  }
}
