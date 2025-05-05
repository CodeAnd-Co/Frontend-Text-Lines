//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
import { Empleado } from '@SRC/Dominio/Modelos/Empleados/Empleado';

export class ListaEmpleados {
  constructor({ mensaje, empleados }) {
    this.mensaje = mensaje;
    this.empleados = Array.isArray(empleados)
      ? empleados.map((empleado) => new Empleado(empleado))
      : [];
  }
}
