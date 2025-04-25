// Capa de Dominio: Validaciones puras y reglas de negocio para crear un usuario

/**
 * Valida los datos del formulario para crear un usuario.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} datos - Datos del usuario
 * @returns {Object} errores - Campos con error
 */
export const validarDatosCrearUsuario = (datos) => {
  const errores = {};

  if (!datos.nombreCompleto) errores.nombreCompleto = true;
  if (!datos.apellido) errores.apellido = true;
  if (!datos.correoElectronico) errores.correoElectronico = true;
  if (!datos.numeroTelefono) errores.numeroTelefono = true;
  if (!datos.direccion) errores.direccion = true;
  if (!datos.genero) errores.genero = true;
  if (!datos.cliente) errores.cliente = true;
  if (!datos.rol) errores.rol = true;

  if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = true;
  } else {
    const hoy = new Date();
    const fecha = new Date(datos.fechaNacimiento);

    if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    }
  }

  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

  if (!datos.contrasenia) {
    errores.contrasenia = true;
  } else {
    if (datos.contrasenia.length < 8) {
      errores.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!tieneCaracterEspecial.test(datos.contrasenia)) {
      errores.contrasenia = 'Debe contener al menos un carácter especial';
    }
  }

  if (!datos.confirmarContrasenia) {
    errores.confirmarContrasenia = true;
  } else if (datos.contrasenia !== datos.confirmarContrasenia) {
    errores.confirmarContrasenia = 'Las contraseñas no coinciden';
  }

  return errores;
};
