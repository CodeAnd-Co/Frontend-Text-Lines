//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
export class Empleado {
  constructor({
    nombreCompleto,
    correoElectronico,
    idEmpleado,
    idUsuario,
    idCliente,
    numeroEmergencia,
    areaTrabajo,
    posicion,
    cantidadPuntos,
    antiguedad,
  }) {
    this.nombreCompleto = nombreCompleto;
    this.correoElectronico = correoElectronico;
    this.idEmpleado = idEmpleado;
    this.idUsuario = idUsuario;
    this.idCliente = idCliente;
    this.numeroEmergencia = numeroEmergencia;
    this.areaTrabajo = areaTrabajo;
    this.posicion = posicion;
    this.cantidadPuntos = parseFloat(cantidadPuntos);
    this.antiguedad = Empleado.formatearFecha(antiguedad);
    this.antiguedadDate = antiguedad;
  }

  static formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    if (fechaObj instanceof Date && !isNaN(fechaObj)) {
      return fechaObj.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  }
}
