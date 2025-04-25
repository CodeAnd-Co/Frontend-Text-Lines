/*
 * Modelo de un usuario
 * RF[03] Leer usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3]
 */

export class UsuarioLectura {
  constructor({
    idUsuario,
    nombreCompleto,
    correoElectronico,
    numeroTelefono,
    direccion,
    fechaNacimiento,
    genero,
    estatus,
    rol,
    clientes = [],
  }) {
    this.idUsuario = idUsuario;
    this.nombreCompleto = nombreCompleto;
    this.correoElectronico = correoElectronico;
    this.numeroTelefono = numeroTelefono;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento;
    this.genero = genero;
    this.estatus = estatus;
    this.rol = rol;
    this.clientes = clientes;
  }
}