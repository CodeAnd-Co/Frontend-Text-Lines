export class PedidoModelo {
  constructor({ idPedido, estado, precioTotal, idEnvio, idPago }) {
    this.idPedido = idPedido || '';
    this.estado = estado || '';
    this.precioTotal = precioTotal || 0;
    this.idEnvio = idEnvio || '';
    this.idPago = idPago || '';
  }
}
