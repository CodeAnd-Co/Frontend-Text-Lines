import { Cliente } from '@SRC/Dominio/Modelos/Clientes/Cliente';
/**
 * Modelo de la respuesta que contiene una lista de clientes
 */
export class ListaClientes {
  constructor({ mensaje, clientes }) {
    this.mensaje = mensaje;
    this.clientes = Array.isArray(clientes) ? clientes.map((cliente) => new Cliente(cliente)) : [];
  }
}
