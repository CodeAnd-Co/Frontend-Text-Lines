/*
 * Modelo de un cliente
 * RF[13] Leer cliente - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF13]
 */

export class ClienteLectura {
  constructor({
    idCliente,
    nombreLegal,
    nombreVisible,
    usuariosAsignados,
    numeroEmpleados,
    imagenCliente,
  }) {
    this.idCliente = idCliente;
    this.nombreLegal = nombreLegal;
    this.nombreVisible = nombreVisible;
    this.usuariosAsignados = usuariosAsignados;
    this.numeroEmpleados = numeroEmpleados;
    this.imagenCliente = imagenCliente;
  }
}