/**
 * Valida los datos del formulario para crear un proveedor.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} proveedor - Datos del proveedor
 * @returns {Object} errores - Campos con error
 */
export const validarProveedor = (proveedor) => {
  const errores = {};

  const normalizados = {
    ...proveedor,
    nombre: proveedor.nombre?.trim(),
    nombreCompania: proveedor.nombreCompania?.trim(),
    telefonoContacto: proveedor.telefonoContacto?.trim(),
    correoContacto: proveedor.correoContacto?.trim(),
    direccion: proveedor.direccion?.trim(),
    codigoPostal: proveedor.codigoPostal?.trim(),
    pais: proveedor.pais?.trim(),
  };

  if (!normalizados.nombre) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (normalizados.nombre.length > 100) {
    errores.nombre = 'El nombre debe tener máximo 100 caracteres';
  }

  if (!normalizados.nombreCompania) {
    errores.nombreCompania = 'El nombre de la compañía es obligatorio';
  } else if (normalizados.nombreCompania.length > 150) {
    errores.nombreCompania = 'El nombre de la compañía debe tener máximo 150 caracteres';
  }

  if (!normalizados.telefonoContacto) {
    errores.telefonoContacto = 'El teléfono de contacto es obligatorio';
  } else if (normalizados.telefonoContacto.length > 20) {
    errores.telefonoContacto = 'El teléfono de contacto debe tener máximo 10 caracteres';
  } else if (!normalizados.telefonoContacto !== 'number') {
    errores.telefonoContacto = 'El teléfono debe ser numerico';
  }

  if (!normalizados.correoContacto) {
    errores.correoContacto = 'El correo electrónico es obligatorio';
  } else {
    if (normalizados.correoContacto.length > 100) {
      errores.correoContacto = 'El correo electrónico debe tener máximo 100 caracteres';
    } else {
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoValido.test(normalizados.correoContacto)) {
        errores.correoContacto = 'Debe ser un correo electrónico válido';
      }
    }
  }

  if (!normalizados.direccion) {
    errores.direccion = 'La dirección es obligatoria';
  } else if (normalizados.direccion.length > 200) {
    errores.direccion = 'La dirección debe tener máximo 200 caracteres';
  }

  if (!normalizados.codigoPostal) {
    errores.codigoPostal = 'El código postal es obligatorio';
  } else if (normalizados.codigoPostal.length > 20) {
    errores.codigoPostal = 'El código postal debe tener máximo 20 caracteres';
  } else if (typeof normalizados.codigoPostal !== 'number') {
    errores.codigoPostal = 'El código postal debe ser numerico';
  }

  if (!normalizados.pais) {
    errores.pais = 'El país es obligatorio';
  } else if (normalizados.pais.length > 50) {
    errores.pais = 'El país debe tener máximo 50 caracteres';
  }

  if (typeof proveedor.estado !== 'number' || (proveedor.estado !== 0 && proveedor.estado !== 1)) {
    errores.estado = 'El estado debe ser 1 (activo) o 0 (inactivo)';
  }

  return errores;
};
