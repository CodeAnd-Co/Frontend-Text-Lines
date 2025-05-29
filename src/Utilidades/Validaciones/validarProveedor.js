/**
 * Valida los datos del formulario para crear un proveedor.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} proveedor - Datos del proveedor
 * @returns {Object} errores - Campos con error
 */
export const validarProveedor = (datosProveedor) => {
  const errores = {};

  // Validación de nombre
  if (!datosProveedor.nombre || datosProveedor.nombre.trim() === '') {
    errores.nombre = 'El nombre es obligatorio.';
  }

  // Validación de nombre de la compañía
  if (!datosProveedor.nombreCompania || datosProveedor.nombreCompania.trim() === '') {
    errores.nombreCompania = 'El nombre de la compañía es obligatorio.';
  }

  // Validación de dirección
  if (!datosProveedor.direccion || datosProveedor.direccion.trim() === '') {
    errores.direccion = 'La dirección es obligatoria.';
  }

  // Validación de país
  if (!datosProveedor.pais || datosProveedor.pais.trim() === '') {
    errores.pais = 'El país es obligatorio.';
  }
  if (datosProveedor.pais.length > 60) {
    errores.pais = 'El país no puede exceder los 60 caracteres.';
  }

  // Validación de estado
  if (typeof datosProveedor.estado !== 'number' || ![0, 1].includes(datosProveedor.estado)) {
    errores.estado = 'El estado debe ser 0 (Inactivo) o 1 (Activo).';
  }

  // Validación de correo electrónico
  const regexCorreo =
    /^[^\s,;:{}[\]/\\=+?"()<>]+@[^\s,;:{}[\]/\\=+?"()<>]+\.[^\s,;:{}[\]/\\=+?"()<>]+$/;
  if (!datosProveedor.correoContacto || !regexCorreo.test(datosProveedor.correoContacto)) {
    errores.correoContacto =
      'El correo electrónico no es válido. Asegúrate de usar un formato correcto.';
  }
  if (
    datosProveedor.correoContacto.startsWith('.') ||
    datosProveedor.correoContacto.endsWith('.')
  ) {
    errores.correoContacto = 'El correo no puede comenzar ni terminar con un punto.';
  }

  // Validación de código postal
  if (!datosProveedor.codigoPostal || !/^\d{5}$/.test(datosProveedor.codigoPostal)) {
    errores.codigoPostal = 'El código postal debe tener exactamente 5 dígitos.';
  }

  // Validación de teléfono
  if (!datosProveedor.telefonoContacto || !/^\d{10}$/.test(datosProveedor.telefonoContacto)) {
    errores.telefonoContacto = 'El teléfono debe tener exactamente 10 dígitos.';
  }

  return errores;
};
