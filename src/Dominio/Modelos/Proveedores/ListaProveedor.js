import { Proveedor } from './Proveedor';

export class ListaProveedores {
  constructor({ mensaje, listaProveedores }) {
    this.mensaje = mensaje;
    this.listaProveedores = Array.isArray(listaProveedores)
      ? listaProveedores.map((prove) => new Proveedor(prove))
      : [];
  }
}