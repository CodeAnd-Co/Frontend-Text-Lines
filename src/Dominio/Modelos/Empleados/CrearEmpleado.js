// RF16 - Crear Empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf16/

/**
 * Valida los datos del formulario para crear un empleado.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} datos - Datos del empleado.
 * @returns {Object} errores - Campos con error.
 */
export const validarDatosCrearEmpleado = (datos, empleadosExistentes = []) => {
  const errores = {};

  if (!datos.nombreCompleto || datos.nombreCompleto.trim() === '') {
    errores.nombreCompleto = true;
  }
  if (!datos.apellido || datos.apellido.trim() === '') {
    errores.apellido = true;
  }
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!datos.correoElectronico) {
    errores.correoElectronico = true;
  } else if (!correoValido.test(datos.correoElectronico)) {
    errores.correoElectronico = 'Correo electrónico no válido';
  }
  const telefonoValido = /^\d{10}$/;

  if (!datos.numeroTelefono) {
    errores.numeroTelefono = true;
  } else if (!telefonoValido.test(datos.numeroTelefono)) {
    errores.numeroTelefono = 'El número de teléfono debe tener exactamente 10 dígitos';
  } else if (empleadosExistentes.some((empleado) => empleado.telefono === datos.numeroTelefono)) {
    errores.numeroTelefono = 'Este número ya está registrado';
  }
  if (!datos.direccion || datos.direccion.trim() === '') {
    errores.direccion = true;
  }
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
  const tieneMayuscula = /[A-Z]/;

  if (!datos.contrasenia || datos.contrasenia.trim() === '') {
    errores.contrasenia = true;
  } else {
    const contraseniaSinEspacios = datos.contrasenia.replace(/\s/g, ''); // elimina todos los espacios

    if (datos.contrasenia.length < 8) {
      errores.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!tieneCaracterEspecial.test(datos.contrasenia)) {
      errores.contrasenia
        = 'Debe contener al menos uno de estos caracteres: ! @ # $ % ^ & * ( ) , . ? " : { } | < >';
    } else if (contraseniaSinEspacios.length < 2) {
      errores.contrasenia
        = 'La contraseña no puede estar compuesta solo de espacios y un carácter especial';
    } else if (!tieneMayuscula.test(datos.contrasenia)) {
      errores.contrasenia = 'Debe contener al menos una letra mayúscula';
    }
  }

  if (!datos.confirmarContrasenia) {
    errores.confirmarContrasenia = true;
  } else if (datos.contrasenia !== datos.confirmarContrasenia) {
    errores.confirmarContrasenia = 'Las contraseñas no coinciden';
  }

  return errores;
};
