/**
 * Modelo de un grupo de empleados
 */
export class GrupoEmpleados {
  constructor({ idGrupo, geNombre, descripcion, idSetProducto, spNombre, totalEmpleados }) {
    this.idGrupo = idGrupo;
    this.geNombre = geNombre;
    this.descripcion = descripcion;
    this.idSetProducto = idSetProducto;
    this.spNombre = spNombre;
    this.totalEmpleados = totalEmpleados;
  }
}
