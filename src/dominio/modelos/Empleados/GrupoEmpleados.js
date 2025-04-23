/**
 * Modelo de un grupo de empleados
 */
export class GrupoEmpleados {
  constructor({ idGrupo, nombre, idSetProducto, totalEmpleados }) {
    this.idGrupo = idGrupo;
    this.nombre = nombre;
    this.idSetProducto = idSetProducto;
    this.totalEmpleados = totalEmpleados;
  }
}
