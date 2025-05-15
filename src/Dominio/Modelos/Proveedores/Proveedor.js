//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
export class Proveedor {
  /**
   * Crea una nueva instancia de Proveedor.
   *
   * @param {Object} params - Objeto con los datos del proveedor.
   * @param {string} params.idProveedor - Identificador único del proveedor.
   * @param {string} params.idCliente - ID del cliente asociado al proveedor.
   * @param {string} params.nombre - Nombre del proveedor (persona de contacto o responsable).
   * @param {string} params.nombreCompania - Nombre de la compañía o empresa proveedora.
   * @param {string} params.telefonoContacto - Número de teléfono del contacto principal.
   * @param {string} params.correoContacto - Correo electrónico del contacto principal.
   * @param {string} params.direccion - Dirección física del proveedor.
   * @param {string} params.codigoPostal - Código postal de la ubicación del proveedor.
   * @param {string} params.pais - País donde se localiza el proveedor.
   * @param {string} params.estado - Estado o provincia donde se localiza el proveedor.
   */
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
