/*
 * Modelo de un grupo de empleados
 * RF[23] Lee grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 */

export class GrupoEmpleadosLectura {
  constructor({
    idGrupo,
    nombre,
    descripcion,
    setsProductos = [],
    idsSetProductos = [],
    empleados = [],
    idsEmpleados = [],
    empleadosActualizar = [],
    setProductosActualizar = [],
  }) {
    this.idGrupo = idGrupo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.setsProductos = setsProductos;
    this.idsSetProductos = idsSetProductos;
    this.empleados = empleados;
    this.idsEmpleados = idsEmpleados;
    this.empleadosActualizar = empleadosActualizar;
    this.setProductosActualizar = setProductosActualizar;
  }
}
