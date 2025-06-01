// Modelo para actualizar un usuario

export const validarDatosActualizarUsuario = (datos, usuariosExistentes = []) => {
  const errores = {};
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoValido = /^\d{10}$/;

  if (!datos.idUsuario) {
    errores.idUsuario = true;
  } else if (datos.idUsuario.toString().length > 10) {
    errores.idUsuario = 'El idUsuario no debe tener más de 10 caracteres';
  }

  if (!datos.nombreCompleto || datos.nombreCompleto.trim().length === 0) {
    errores.nombreCompleto = 'El nombre completo es obligatorio';
  }

  if (!datos.correoElectronico) {
    errores.correoElectronico = 'El correo electrónico es obligatorio';
  } else if (!emailValido.test(datos.correoElectronico)) {
    errores.correoElectronico = 'Correo electrónico inválido';
  } else if (
    usuariosExistentes.some(
      (usuario) =>
        usuario.correoElectronico === datos.correoElectronico &&
        usuario.idUsuario !== datos.idUsuario
    )
  ) {
    errores.correoElectronico = 'Este correo ya está registrado';
  }

  if (datos.contrasenia && datos.contrasenia.length < 6) {
    errores.contrasenia = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (!datos.numeroTelefono) {
    errores.numeroTelefono = 'El número de teléfono es obligatorio';
  } else if (!telefonoValido.test(datos.numeroTelefono)) {
    errores.numeroTelefono = 'El número de teléfono debe tener exactamente 10 dígitos';
  }

  if (!datos.direccion || datos.direccion.trim().length === 0) {
    errores.direccion = 'La dirección es obligatoria';
  }

  if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
  } else {
    const hoy = new Date();
    const fecha = new Date(datos.fechaNacimiento);
    if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    }
  }

  if (!datos.genero) {
    errores.genero = 'El género es obligatorio';
  }

  if (typeof datos.estatus === 'undefined' || datos.estatus === null) {
    errores.estatus = 'El estatus es obligatorio';
  }

  if (!datos.idRol) {
    errores.idRol = 'El rol es obligatorio';
  }

  return errores;
};
