//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { Producto } from '@Modelos/Productos/Producto';

export class ListaProductos {
  /**
   * Crea una nueva instancia de ListaProductos.
   *
   * @param {Object} params - Objeto con los datos de la respuesta.
   * @param {string} params.mensaje - Mensaje informativo relacionado con la operación.
   * @param {Array<Object>} params.listaProductos - Lista de productos en formato plano para ser convertidos a instancias de Producto.
   */
  constructor({ mensaje, listaProductos }) {
    this.mensaje = mensaje;
    this.listaProductos = Array.isArray(listaProductos)
      ? listaProductos.map((prod) => new Producto(prod))
      : [];
  }
}
