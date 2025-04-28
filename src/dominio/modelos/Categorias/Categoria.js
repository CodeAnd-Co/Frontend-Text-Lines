/**
 * Modelo de una categoría
 * Representa los datos básicos de una categoría asociada a un cliente.
 * 
 * RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]
 */
export class Categoria {
    constructor({ idCategoria, nombreCategoria, descripcion, cantidadProductos, idCliente }) {
      this.idCategoria = idCategoria;
      this.nombreCategoria = nombreCategoria;
      this.descripcion = descripcion;
      this.cantidadProductos = cantidadProductos;
      this.idCliente = idCliente;
    }
}