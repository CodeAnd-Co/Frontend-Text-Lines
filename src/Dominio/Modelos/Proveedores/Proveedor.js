/**
 * Modelo de un producto
 */
export class Proveedor {
    constructor({
      idProveedor,
      idCliente,
      nombre,
      nombreCompania,
      telefonoContacto,
      correoContacto,
      direccion,
      codigoPostal,
      pais,
      estado,
    }) {
      this.idProveedor = idProveedor;
      this.idCliente = idCliente;
      this.nombre = nombre;
      this.nombreCompania = nombreCompania;
      this.telefonoContacto = telefonoContacto;
      this.correoContacto = correoContacto;
      this.direccion = direccion;
      this.codigoPostal = codigoPostal;
      this.pais = pais;
      this.estado = estado;
    }
  }