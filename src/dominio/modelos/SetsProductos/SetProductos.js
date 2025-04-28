/**
 * Modelo de un set de productos
 * Representa los datos básicos de un set de productos asociado a un cliente.
 *
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 */

export class SetProductos {
  constructor({ nombre, descripcion, activo }) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activo = activo;
  }
}
