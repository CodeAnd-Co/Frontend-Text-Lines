//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
export default class Opcion {
  /**
   * Crea una nueva instancia de Opcion.
   *
   * @param {Object} params - Objeto con los datos de la opción.
   * @param {number} params.cantidad - Cantidad disponible o configurada para esta opción.
   * @param {string} params.valorOpcion - Valor o descripción de la opción (ej. "Rojo", "Talla M").
   * @param {string} params.SKUautomatico - SKU generado automáticamente por el sistema.
   * @param {string} params.SKUcomercial - SKU comercial asignado manualmente.
   * @param {number} params.costoAdicional - Costo adicional asociado a esta opción (si aplica).
   * @param {number} params.descuento - Porcentaje de descuento aplicado a esta opción.
   * @param {string} params.estado - Estado de la opción (ej. "activo", "inactivo").
   */
  constructor({
    cantidad,
    valorOpcion,
    SKUautomatico,
    SKUcomercial,
    costoAdicional,
    descuento,
    estado,
  }) {
    this.cantidad = cantidad;
    this.valorOpcion = valorOpcion;
    this.SKUautomatico = SKUautomatico;
    this.SKUcomercial = SKUcomercial;
    this.costoAdicional = costoAdicional;
    this.descuento = descuento;
    this.estado = estado;
  }
}
