//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

export class TipoPago {
  constructor({ idTipoPago, metodo, habilitado }) {
    this.idTipoPago = idTipoPago;
    this.metodo = metodo;
    this.habilitado = Boolean(habilitado);
  }
}
