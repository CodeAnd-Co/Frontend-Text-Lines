//Modelo para actualizar un empleado

export const validarDatosActualizarEmpleado = (datos, empleadosExistentes = []) => {
  const errores = {};
  const numeroEmergenciaValido = /^\d{10}$/;

  if (!datos.idEmpleado) {
    errores.idEmpleado = true;
  } else if (datos.idEmpleado.toString().length > 10) {
    errores.idEmpleado = 'El idEmpleado no debe tener más de 10 caracteres';
  }

  if (!datos.idUsuario) {
    errores.idUsuario = true;
  } else if (datos.idUsuario.toString().length > 10) {
    errores.idUsuario = 'El idUsuario no debe tener más de 10 caracteres';
  }

  if (!datos.numeroEmergencia) {
    errores.numeroEmergencia = true;
  } else if (!numeroEmergenciaValido.test(datos.numeroEmergencia)) {
    errores.numeroEmergencia = 'El número de emergencia debe tener exactamente 10 dígitos';
  } else if (
    empleadosExistentes.some((empleado) => empleado.numeroEmergencia === datos.numeroEmergencia)
  ) {
    errores.numeroEmergencia = 'Este número ya está registrado';
  }

  if (!datos.areaTrabajo) {
    errores.areaTrabajo = true;
  }

  if (!datos.posicion) {
    errores.posicion = true;
  }

  if (!datos.cantidadPuntos) {
    errores.cantidadPuntos = true;
  } else if (isNaN(datos.cantidadPuntos)) {
    errores.cantidadPuntos = 'La cantidad de puntos debe ser un número';
  }

  if (!datos.antiguedad) {
    errores.antiguedad = true;
  } else {
    const hoy = new Date();
    const limiteInferiorFecha = new Date('1900-01-01');
    const fecha = new Date(datos.antiguedad);

    if (fecha > hoy) {
      errores.antiguedad = 'La fecha no puede ser futura';
    } else if (fecha < limiteInferiorFecha) {
      errores.antiguedad = 'Ingresa una fecha válida';
    }
  }

  return errores;
};
