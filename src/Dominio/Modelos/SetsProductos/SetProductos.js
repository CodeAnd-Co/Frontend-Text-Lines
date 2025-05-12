/**
 * Modelo de un set de productos
 * Representa los datos básicos de un set de productos asociado a un cliente.
 *
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 * RF48 - Super Administrador, Cliente Lee Categoria de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf48/
 */

export class SetProductos {
  constructor({ idSetProducto, nombre, descripcion, activo, productos, grupos }) {
    this.idSetProducto = idSetProducto;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activo = activo;
    this.productos = productos;
    this.grupos = grupos;
  }
}
