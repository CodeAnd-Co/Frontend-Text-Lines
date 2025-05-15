//RF21- Crear grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF21

/**
 * 
 * Valida los datos del formulario para crear un grupo de empleados.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} datos - Datos del grupo
 * @param {string} datos.nombreGrupo - Nombre del grupo
 * @param {string} datos.descripcion - Descripción del grupo
 * @param {Array} gruposExistentes - Lista de grupos existentes
 * @returns {Object} errores - Campos con error
 */

export const validarDatosCrearGrupoEmpleado = (datos, gruposExistentes = []) => {
  const errores = {};

  const nombre = datos.nombreGrupo?.trim();
  const descripcion = datos.descripcion?.trim();

  if (!nombre) {
    errores.nombreGrupo = 'El nombre es obligatorio';
  } else if (
    gruposExistentes.some(
      (grupo) => grupo.nombreGrupo?.trim().toLowerCase() === nombre.toLowerCase()
    )
  ) {
    errores.nombreGrupo = 'Este nombre de grupo ya está registrado';
  }

  if (!descripcion) {
    errores.descripcion = 'La descripción es obligatoria';
  }

  if (!Array.isArray(datos.listaEmpleados) || datos.listaEmpleados.length === 0) {
    errores.listaEmpleados = 'Se debe asignar al menos un empleado';
  }

  return errores;
};
