/**
 * Modelo de un usuario
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
      estatus
    }) {
      this.idUsuario = idUsuario;
      this.nombreCompleto = nombreCompleto;
      this.correoElectronico = correoElectronico;
      this.numeroTelefono = numeroTelefono;
      this.direccion = direccion;
      this.fechaNacimiento = fechaNacimiento;
      this.genero = genero;
      this.estatus = estatus;
    }
  }  