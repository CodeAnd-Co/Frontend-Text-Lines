/**
 * Modelo de un cliente
 */
export class Cliente {
  constructor({
    idCliente,
    nombreComercial,
    nombreFiscal,
    idImagen,
    urlImagen,
    tipoImagen,
    textoAlternativo,
  }) {
    this.idCliente = idCliente;
    this.nombreComercial = nombreComercial;
    this.nombreFiscal = nombreFiscal;
    this.idImagen = idImagen;
    this.urlImagen = urlImagen;
    this.tipoImagen = tipoImagen;
    this.textoAlternativo = textoAlternativo;
  }
}
