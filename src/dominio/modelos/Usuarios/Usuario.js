/**
 * Modelo de un usuario
 */

export class Usuario {
  constructor({ idUsuario, nombre, rol, cliente, estatus, correo, telefono }) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.rol = rol;
    this.cliente = cliente;
    this.estatus = estatus;
    this.correo = correo;
    this.telefono = telefono;
  }
}
