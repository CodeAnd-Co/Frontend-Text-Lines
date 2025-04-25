//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
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
