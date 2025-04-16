export class UsuarioModelo {
    constructor({
      idUsuario,
      nombreCompleto,
      correoElectronico,
      contrasenia = null,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus,
    }) {
      this.id = idUsuario;
      this.nombre = nombreCompleto;
      this.correo = correoElectronico;
      this.contrasenia = contrasenia;
      this.telefono = numeroTelefono;
      this.direccion = direccion;
      this.fechaNacimiento = fechaNacimiento;
      this.genero = genero;
      this.estatus = estatus;
    }
  }