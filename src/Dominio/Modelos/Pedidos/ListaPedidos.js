// RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
import { Pedido } from '@SRC/Dominio/Modelos/Pedidos/Pedidos';

export class ListaPedidos {
  constructor({ mensaje, pedidos }) {
    this.mensaje = mensaje;
    this.pedidos = Array.isArray(pedidos) ? pedidos.map((pedido) => new Pedido(pedido)) : [];
  }
}
