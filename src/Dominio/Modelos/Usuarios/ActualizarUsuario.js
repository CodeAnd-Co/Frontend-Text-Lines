// Modelo para actualizar un usuario

export const validarDatosActualizarUsuario = (datos, usuariosExistentes = []) => {
  const errores = {};
  const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const telefonoValido = /^\d{10}$/;
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;

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

  if (datos.contrasenia && /\s/.test(datos.contrasenia)) {
    errores.contrasenia = 'La contraseña no debe contener espacios en blanco';
  } else if (datos.contrasenia && datos.contrasenia.length < 8) {
    errores.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
  } else if (datos.contrasenia && !tieneCaracterEspecial.test(datos.contrasenia)) {
    errores.contrasenia =
      'Debe contener al menos uno de estos caracteres: ! @ # $ % ^ & * ( ) , . ? " : { } | < >';
  } else if (datos.contrasenia && !tieneMayuscula.test(datos.contrasenia)) {
    errores.contrasenia = 'Debe contener al menos una letra mayúscula';
  }

  if (datos.contrasenia && !datos.confirmarContrasenia) {
    errores.confirmarContrasenia = true;
  } else if (datos.contrasenia && datos.contrasenia !== datos.confirmarContrasenia) {
    errores.confirmarContrasenia = 'Las contraseñas no coinciden';
  }

  if (!datos.numeroTelefono) {
    errores.numeroTelefono = 'El número de teléfono es obligatorio';
  } else if (!telefonoValido.test(datos.numeroTelefono)) {
    errores.numeroTelefono = 'El número de teléfono debe tener exactamente 10 dígitos';
  }

  if (!datos.direccion || datos.direccion.trim().length === 0) {
    errores.direccion = 'La dirección es obligatoria';
  } else if (datos.direccion.trim().length < 3) {
    errores.direccion = 'La dirección debe tener al menos 3 caracteres';
  } else if (datos.direccion.length > 100) {
    errores.direccion = 'La dirección no debe exceder 100 caracteres';
  }

  /*if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
  } else {
    const hoy = new Date();
    const fecha = new Date(datos.fechaNacimiento);

    if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    }
  }*/

  if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = true;
  } else {
    const hoy = new Date();
    const limiteInferiorFecha = new Date('1900-01-01');
    const fecha = new Date(datos.fechaNacimiento);

    if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    } else if (fecha < limiteInferiorFecha) {
      errores.fechaNacimiento = 'Ingresa una fecha válida';
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
