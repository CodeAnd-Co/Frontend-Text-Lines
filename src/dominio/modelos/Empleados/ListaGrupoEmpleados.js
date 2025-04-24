//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import { GrupoEmpleados } from './GrupoEmpleados';

export class ListaGrupoEmpleados {
  constructor({ mensaje, grupoEmpleados }) {
    this.mensaje = mensaje;
    this.grupoEmpleados = Array.isArray(grupoEmpleados)
      ? grupoEmpleados.map((grupo) => new GrupoEmpleados(grupo))
      : [];
  }
}
