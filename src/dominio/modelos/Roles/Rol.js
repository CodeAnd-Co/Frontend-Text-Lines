/**
 * Modelo de un rol
 */
export class Rol {
  constructor({ idRol, nombre, descripcion }) {
    this.id = idRol;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}