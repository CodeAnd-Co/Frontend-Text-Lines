import { Producto } from '@Modelos/Productos/Producto';

/**
 * Modelo de la respuesta que contiene una lista de productos
 */
export class ListaProductos {
  constructor({ mensaje, listaProductos }) {
    this.mensaje = mensaje;
    this.listaProductos = Array.isArray(listaProductos)
      ? listaProductos.map((prod) => new Producto(prod))
      : [];
  }
}
