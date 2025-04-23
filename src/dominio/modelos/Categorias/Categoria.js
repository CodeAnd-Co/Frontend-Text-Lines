/**
 * Modelo de una categoría
 */
export class Categoria {
    constructor({ idCategoria, nombreCategoria, descripcion, cantidadProductos }) {
      this.idCategoria = idCategoria;
      this.nombreCategoria = nombreCategoria;
      this.descripcion = descripcion;
      this.cantidadProductos = cantidadProductos;
    }
}