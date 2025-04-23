import { GrupoEmpleados } from './GrupoEmpleados';

/**
 * Modelo de la respuesta que contiene una lista de grupos de empleados
 */
export class ListaGrupoEmpleados {
  constructor({ mensaje, grupoEmpleados }) {
    this.mensaje = mensaje;
    this.grupoEmpleados = Array.isArray(grupoEmpleados)
      ? grupoEmpleados.map((grupo) => new GrupoEmpleados(grupo))
      : [];
  }
}
