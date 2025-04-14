export class Producto {
  constructor(idProducto, nombreComun, precioVenta, estado, imagen) {
    this.idProducto = idProducto;
    this.nombreComun = nombreComun;
    this.precioVenta = precioVenta;
    this.estado = estado;
    this.imagen = imagen;
  }

  getImagen() {
    return this.imagen;
  }
}
