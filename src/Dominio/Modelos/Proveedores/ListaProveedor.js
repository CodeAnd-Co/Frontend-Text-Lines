//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { Proveedor } from './Proveedor';

export class ListaProveedores {
  /**
   * Crea una nueva instancia de ListaProveedores.
   *
   * @param {Object} params - Objeto con los datos de la respuesta.
   * @param {string} params.mensaje - Mensaje informativo relacionado con la operación.
   * @param {Array<Object>} params.listaProveedores - Lista de objetos plano que representan proveedores.
   */
  constructor({ mensaje, listaProveedores }) {
    this.mensaje = mensaje;
    this.listaProveedores = Array.isArray(listaProveedores)
      ? listaProveedores.map((prove) => new Proveedor(prove))
      : [];
  }
}
