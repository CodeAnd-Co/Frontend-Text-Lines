import { TipoPago } from '@Modelos/Pagos/TipoPago';

export class ListaTipoPago {
  constructor({ mensaje, listaTipoPagos }) {
    this.mensaje = mensaje;
    this.listaTipoPagos = Array.isArray(listaTipoPagos)
      ? listaTipoPagos.map((tipoPago) => new TipoPago(tipoPago))
      : [];
  }
}
