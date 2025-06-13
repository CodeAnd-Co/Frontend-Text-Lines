/*
 * Modelo de información de un producto
 * RF[28] Lee información del producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF28
 */

export class InfoProducto {
  constructor({ producto = {} }) {
    this.idProducto = producto.idProducto ?? null;
    this.nombreComun = producto.nombreComun ?? '';
    this.nombreComercial = producto.nombreComercial ?? '';
    this.tipoProducto = producto.tipoProducto ?? '';
    this.marca = producto.marca ?? '';
    this.modelo = producto.modelo ?? '';
    this.estado = producto.estado ?? null;
    this.idProveedor = producto.idProveedor ?? null;
    this.nombreProveedor = producto.nombreProveedor ?? '';
    this.precioVenta = producto.precioVenta ?? 0;
    this.precioCliente = producto.precioCliente ?? 0;
    this.precioPuntos = producto.precioPuntos ?? 0;
    this.costo = producto.costo ?? 0;
    this.envio = producto.envio ?? 0;
    this.impuesto = producto.impuesto ?? 0;
    this.descuento = producto.descuento ?? 0;

    // Variantes del producto (puede ser un arreglo vacío)
    this.variantes = Array.isArray(producto.variantes)
      ? producto.variantes.map((variante) => new VarianteProducto(variante))
      : [];
  }
}

class VarianteProducto {
  constructor({ idVariante, nombreVariante, descripcion, opciones = [] }) {
    this.idVariante = idVariante ?? null;
    this.nombreVariante = nombreVariante ?? '';
    this.descripcion = descripcion ?? '';
    this.opciones = Array.isArray(opciones)
      ? opciones.map((opcion) => new OpcionVariante(opcion))
      : [];
  }
}

class OpcionVariante {
  constructor({
                estado,
                cantidad,
                descuento,
                valorOpcion,
                SKUcomercial,
                SKUautomatico,
                costoAdicional,
              }) {
    this.estado = estado ?? null;
    this.cantidad = cantidad ?? 0;
    this.descuento = descuento ?? 0;
    this.valorOpcion = valorOpcion ?? '';
    this.SKUcomercial = SKUcomercial ?? '';
    this.SKUautomatico = SKUautomatico ?? '';
    this.costoAdicional = costoAdicional ?? 0;
  }
}
