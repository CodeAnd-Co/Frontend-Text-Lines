// RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
export class Pedido {
  constructor({
    idPedido,
    nombreEmpleado,
    fechaOrden,
    estatusPedido,
    precioTotal,
    estatusPago,
    estatusEnvio,
  }) {
    this.idPedido = idPedido;
    this.nombreEmpleado = nombreEmpleado;
    this.fechaOrden = fechaOrden;
    this.estatusPedido = estatusPedido;
    this.precioTotal = precioTotal;
    this.estatusPago = estatusPago;
    this.estatusEnvio = estatusEnvio;
  }
}
