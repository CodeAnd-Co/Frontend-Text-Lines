export class TipoPago {
  constructor({ idTipoPago, metodo, habilitado }) {
    this.idTipoPago = idTipoPago;
    this.metodo = metodo;
    this.habilitado = Boolean(habilitado);
  }
}
