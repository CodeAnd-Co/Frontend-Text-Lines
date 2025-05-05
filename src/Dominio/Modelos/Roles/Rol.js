/**
 * @class Rol
 * @classdesc Representa un rol dentro del sistema, incluyendo su identificador, nombre y descripción.
 * Utilizada para mapear objetos provenientes del backend y facilitar su manipulación en el frontend.
 */
export class Rol {
    /**
     * Crea una nueva instancia de Rol.
     * @constructor
     * @param {number} idRol - Identificador único del rol.
     * @param {string} nombre - Nombre descriptivo del rol.
     * @param {string} descripcion - Breve descripción de las funciones o permisos del rol.
     */
    constructor(idRol, nombre, descripcion) {
      this.idRol = idRol;
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  }