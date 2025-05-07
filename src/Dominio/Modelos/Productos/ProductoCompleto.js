export default class ProductoCompleto {
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
