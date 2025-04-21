// La clase Rol representa un rol dentro del sistema, encapsulando sus propiedades fundamentales.
export class Rol {
    // El constructor inicializa una nueva instancia de Rol utilizando un objeto con propiedades: idRol, nombre y descripcion.
    constructor({ idRol, nombre, descripcion }) {
      // Asigna el identificador único del rol
      this.id = idRol;
      // Asigna el nombre del rol
      this.nombre = nombre;
      // Asigna la descripción del rol
      this.descripcion = descripcion;
    }
  }