export default class Opcion {
  /**
   * @param {Object} params
   * @param {number} params.cantidad - Cantidad disponible de esta opción
   * @param {string} params.valorOpcion - Descripción o valor de la opción (por ejemplo: "Talla S")
   * @param {string} params.SKUautomatico - SKU generado automáticamente
   * @param {string} params.SKUcomercial - SKU comercial
   * @param {number} params.costoAdicional - Costo adicional para esta opción
   * @param {number} params.descuento - Descuento aplicado (porcentaje o monto)
   * @param {number} params.estado - Estado (por ejemplo: 1 = activo, 0 = inactivo)
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
