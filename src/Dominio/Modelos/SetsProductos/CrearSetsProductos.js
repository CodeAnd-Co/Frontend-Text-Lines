/**
 * Modelo para crear un set de productos
 * Representa los datos necesarios para crear un nuevo set de productos.
 */
export class CrearSetsProducto {
  constructor({ nombre, nombreVisible, descripcion, productos }) {
    this.nombre = nombre;
    this.nombreVisible = nombreVisible;
    this.descripcion = descripcion;
    this.activo = 1;
    this.idProductos = productos.map(producto => producto.idProducto);
  }
}