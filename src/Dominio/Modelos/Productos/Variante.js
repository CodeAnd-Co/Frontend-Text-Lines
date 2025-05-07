import Opcion from '@Modelos/Productos/Opcion';

export default class Variante {
  constructor({ identificador, nombreVariante, descripcion, opciones }) {
    this.identificador = identificador;
    this.nombreVariante = nombreVariante;
    this.descripcion = descripcion;
    this.opciones = opciones.map((opcion) => new Opcion(opcion));
  }
}
