/**
 * Valida los datos del formulario para crear un nuevo rol.
 * Devuelve un objeto con los campos que tienen errores.
 *
 * @param {Object} datos - Datos del nuevo rol
 * @param {string} datos.nombreRol - Nombre del rol
 * @param {string} datos.descripcionRol - Descripción del rol (opcional)
 * @param {Array} datos.permisosSeleccionados - Permisos seleccionados
 * @returns {Object} errores - Campos con error (clave = campo, valor = mensaje)
 */
export const validarDatosCrearRol = (datos) => {
  const errores = {};

  const nombre = datos.nombreRol?.trim();
  const permisos = datos.permisosSeleccionados;

  if (!nombre) {
    errores.nombreRol = 'El nombre del rol es obligatorio.';
  }

  if (!Array.isArray(permisos) || permisos.length === 0) {
    errores.permisosSeleccionados = 'Debes seleccionar al menos un permiso.';
  }

  return errores;
};
