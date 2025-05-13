import { TipoPago } from '@Modelos/Pagos/TipoPago';

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

export class ListaTipoPago {
  constructor({ mensaje, listaTipoPagos }) {
    this.mensaje = mensaje;
    this.listaTipoPagos = Array.isArray(listaTipoPagos)
      ? listaTipoPagos.map((tipoPago) => new TipoPago(tipoPago))
      : [];
  }
}
