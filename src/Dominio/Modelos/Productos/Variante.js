//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import Opcion from '@Modelos/Productos/Opcion';

export default class Variante {
  /**
   * Crea una nueva instancia de Variante.
   *
   * @param {Object} params - Objeto con los datos de la variante.
   * @param {string} params.identificador - Identificador único de la variante.
   * @param {string} params.nombreVariante - Nombre descriptivo de la variante.
   * @param {string} params.descripcion - Descripción detallada de la variante.
   * @param {Array<Object>} params.opciones - Lista de opciones asociadas a la variante.
   */
  constructor({ identificador, nombreVariante, descripcion, opciones }) {
    this.identificador = identificador;
    this.nombreVariante = nombreVariante;
    this.descripcion = descripcion;
    this.opciones = opciones.map((opcion) => new Opcion(opcion));
  }
}
