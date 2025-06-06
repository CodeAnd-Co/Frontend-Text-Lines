//RF16 - Crear empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16

/**
 * Valida los datos del formulario para crear un empleado.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} datos - Datos del empleado
 * @returns {Object} errores - Campos con error
 */

export const validarDatosCrearEmpleado = (datos, empleadosExistentes = []) => {
  const errores = {};

  if (!datos.nombreCompleto || datos.nombreCompleto.trim() === '') {
    errores.nombreCompleto = 'El campo es obligatorio';
  }

  if (!datos.fechaNacimiento) {
    s;
    errores.fechaNacimiento = 'El campo es obligatorio';
  } else {
    const hoy = new Date();
    const fecha = new Date(datos.fechaNacimiento);

    if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    } else {
      // Calcular la fecha mínima permitida (18 años antes de hoy)
      const fechaMinima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
      if (fecha > fechaMinima) {
        errores.fechaNacimiento = 'El empleado debe tener al menos 18 años al día de hoy';
      }
    }
  }

  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;

  if (!datos.genero) errores.genero = true;

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

  if (!datos.contrasenia || datos.contrasenia.trim() === '') {
    errores.contrasenia = true;
  } else {
    const contraseniaSinEspacios = datos.contrasenia.replace(/\s/g, '');
    if (datos.contrasenia.length < 8) {
      errores.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!tieneCaracterEspecial.test(datos.contrasenia)) {
      errores.contrasenia =
        'Debe contener al menos uno de estos caracteres: ! @ # $ % ^ & * ( ) , . ? " : { } | < >';
    } else if (contraseniaSinEspacios.length < 2) {
      errores.contrasenia =
        'La contraseña no puede estar compuesta solo de espacios y un carácter especial';
    } else if (!tieneMayuscula.test(datos.contrasenia)) {
      errores.contrasenia = 'Debe contener al menos una letra mayúscula';
    }
  }
  if (!datos.confirmarContrasenia || datos.confirmarContrasenia.trim() === '') {
    errores.confirmarContrasenia = true;
  } else if (datos.contrasenia !== datos.confirmarContrasenia) {
    errores.confirmarContrasenia = 'Las contraseñas no coinciden';
  }

  if (!datos.numeroEmergencia || datos.numeroEmergencia.trim() === '') {
    errores.numeroEmergencia = true;
  } else if (!telefonoValido.test(datos.numeroEmergencia)) {
    errores.numeroEmergencia = 'El número de emergencia debe tener exactamente 10 dígitos';
  }
  if (!datos.areaTrabajo || datos.areaTrabajo.trim() === '') {
    errores.areaTrabajo = 'El campo no puede estar vacío ni contener sólo espacios';
  }
  if (!datos.areaTrabajo || datos.areaTrabajo.trim() === '') {
    errores.areaTrabajo = true;
  }
  if (!datos.posicion || datos.posicion.trim() === '') {
    errores.posicion = 'El campo no puede estar vacío ni contener sólo espacios';
  }

  if (!datos.cantidadPuntos || isNaN(datos.cantidadPuntos) || datos.cantidadPuntos < 0) {
    errores.cantidadPuntos = 'La cantidad de puntos debe ser un número positivo';
  }

  if (!datos.antiguedad) {
    errores.antiguedad = 'La antigüedad es requerida';
  } else {
    const hoy = new Date();
    const antiguedadFecha = new Date(datos.antiguedad);
    if (antiguedadFecha > hoy) {
      errores.antiguedad = 'La antigüedad no puede ser una fecha futura';
    }
  }
  if (!datos.antiguedad) {
    errores.antiguedad = true;
  }

  return errores;
};
