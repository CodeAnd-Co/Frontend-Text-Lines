//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
export default class ProductoCompleto {
  /**
   * Crea una nueva instancia de ProductoCompleto.
   *
   * @param {Object} params - Objeto con los datos del producto.
   * @param {string} params.idProveedor - ID del proveedor asociado al producto.
   * @param {string} params.nombreComun - Nombre común del producto (nombre genérico).
   * @param {string} params.nombreComercial - Nombre comercial con el que se presenta el producto.
   * @param {string} params.descripcion - Descripción detallada del producto.
   * @param {string} params.marca - Marca del producto.
   * @param {string} params.modelo - Modelo o referencia del producto.
   * @param {string} params.tipoProducto - Tipo o categoría del producto.
   * @param {number} params.precioPuntos - Precio del producto en puntos (si aplica).
   * @param {number} params.precioCliente - Precio para clientes registrados.
   * @param {number} params.precioVenta - Precio general de venta del producto.
   * @param {number} params.costo - Costo base del producto.
   * @param {number} params.impuesto - Porcentaje de impuesto aplicado al producto.
   * @param {number} params.descuento - Porcentaje de descuento aplicado al producto.
   * @param {string} params.estado - Estado del producto (ej. 'activo', 'inactivo').
   * @param {boolean} params.envio - Indica si el producto requiere envío (true/false).
   */
  constructor({
    idProveedor,
    nombreComun,
    nombreComercial,
    descripcion,
    marca,
    modelo,
    tipoProducto,
    precioPuntos,
    precioCliente,
    precioVenta,
    costo,
    impuesto,
    descuento,
    estado,
    envio,
  }) {
    this.idProveedor = idProveedor;
    this.nombreComun = nombreComun;
    this.nombreComercial = nombreComercial;
    this.descripcion = descripcion;
    this.marca = marca;
    this.modelo = modelo;
    this.tipoProducto = tipoProducto;
    this.precioPuntos = precioPuntos;
    this.precioCliente = precioCliente;
    this.precioVenta = precioVenta;
    this.costo = costo;
    this.impuesto = impuesto;
    this.descuento = descuento;
    this.estado = estado;
    this.envio = envio;
  }
}
