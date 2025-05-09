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
    
    if (!datos.nombreGrupo || datos.nombreGrupo.trim() === '') {
        errores.nombreGrupo = true;
    } else if (
        gruposExistentes.some(
        (grupo) => grupo.nombreGrupo === datos.nombreGrupo
        )
    ) {
        errores.nombreGrupo = 'Este nombre de grupo ya está registrado';
    }
    
    if (!datos.descripcion || datos.descripcion.trim() === '') {
        errores.descripcion = true;
    }

    if (!datos.listaEmpleados || datos.listaEmpleados.length === 0) {
        errores.listaEmpleados = 'Se debe asignar al menos un empleado';
    }
    
    return errores;
    }