//RF16 - Crear empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16
import { useState } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '@Hooks/AuthProvider';
import { RepositorioCrearEmpleado } from '@Repositorios/Empleados/RepositorioCrearEmpleado';

// --- Validación robusta ---
const validarDatosCrearEmpleado = (datos) => {
  const errores = {};
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoValido = /^\d{10}$/;
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneMayuscula = /[A-Z]/;
  const tieneMinuscula = /[a-z]/;
  const tieneNumero = /\d/;

  if (!datos.nombreCompleto || datos.nombreCompleto.trim() === '') {
    errores.nombreCompleto = true;
  } else if (datos.nombreCompleto.length < 3) {
    errores.nombreCompleto = 'El nombre completo debe tener al menos 3 caracteres';
  } else if (!datos.nombreCompleto.includes(' ')) {
    errores.nombreCompleto = 'Debe ingresar al menos un nombre y un apellido';
  } else if (datos.nombreCompleto.startsWith(' ') || datos.nombreCompleto.endsWith(' ')) {
    errores.nombreCompleto = 'El nombre completo no debe tener espacios al inicio o al final';
  } else if (datos.nombreCompleto.includes('  ')) {
    errores.nombreCompleto = 'El nombre completo no debe contener dos o más espacios seguidos';
  }

  if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = true;
  }

  if (!datos.genero) errores.genero = true;
  if (!datos.correoElectronico) {
    errores.correoElectronico = true;
  } else if (!correoValido.test(datos.correoElectronico)) {
    errores.correoElectronico = 'Correo electrónico no válido';
  }
  if (!datos.numeroTelefono) {
    errores.numeroTelefono = true;
  } else if (!telefonoValido.test(datos.numeroTelefono)) {
    errores.numeroTelefono = 'El número de teléfono debe tener exactamente 10 dígitos';
  }
  if (!datos.direccion || datos.direccion.trim() === '') {
    errores.direccion = true;
  }
  if (!datos.contrasenia || datos.contrasenia.trim() === '') {
    errores.contrasenia = true;
  } else if (datos.contrasenia.length < 8) {
    errores.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
  } else if (!tieneCaracterEspecial.test(datos.contrasenia)) {
    errores.contrasenia = 'Debe contener al menos un carácter especial';
  } else if (!tieneMayuscula.test(datos.contrasenia)) {
    errores.contrasenia = 'Debe contener al menos una letra mayúscula';
  } else if (!tieneMinuscula.test(datos.contrasenia)) {
    errores.contrasenia = 'Debe contener al menos una letra minúscula';
  } else if (!tieneNumero.test(datos.contrasenia)) {
    errores.contrasenia = 'Debe contener al menos un número';
  } else if (datos.contrasenia.replace(/\s/g, '').length < 2) {
    errores.contrasenia =
      'La contraseña no puede estar compuesta solo de espacios y un carácter especial';
  }

  if (!datos.confirmarContrasenia || datos.confirmarContrasenia.trim() === '') {
    errores.confirmarContrasenia = true;
  } else if (datos.contrasenia !== datos.confirmarContrasenia) {
    errores.confirmarContrasenia = 'Las contraseñas no coinciden';
  }
  if (!datos.antiguedad) {
    errores.antiguedad = true;
  }
  if (!datos.areaTrabajo || datos.areaTrabajo.trim() === '') {
    errores.areaTrabajo = true;
  }
  if (!datos.posicion || datos.posicion.trim() === '') {
    errores.posicion = true;
  }
  if (
    !datos.cantidadPuntos ||
    isNaN(Number(datos.cantidadPuntos)) ||
    Number(datos.cantidadPuntos) < 0
  ) {
    errores.cantidadPuntos = 'La cantidad de puntos debe ser un número positivo';
  }
  if (!datos.numeroEmergencia || !telefonoValido.test(datos.numeroEmergencia)) {
    errores.numeroEmergencia = !datos.numeroEmergencia
      ? true
      : 'El número de emergencia debe tener exactamente 10 dígitos';
  }
  return errores;
};

export const useCrearEmpleado = () => {
  const { usuario } = useAuth();
  const idCliente = usuario?.clienteSeleccionado?.idCliente || usuario?.clienteSeleccionado;

  const estadoInicial = {
    nombreCompleto: '',
    correoElectronico: '',
    contrasenia: '',
    confirmarContrasenia: '',
    numeroTelefono: '',
    direccion: '',
    fechaNacimiento: null,
    numeroEmergencia: '',
    genero: '',
    areaTrabajo: '',
    posicion: '',
    cantidadPuntos: '',
    antiguedad: null,
    estatus: '1',
    idCliente: idCliente,
    idRol: '3',
  };

  const [datosEmpleado, setDatosEmpleado] = useState(estadoInicial);
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    let nuevoValor = value;

    // Solo números para ciertos campos
    if (['numeroEmergencia', 'numeroTelefono', 'cantidadPuntos'].includes(name)) {
      nuevoValor = value.replace(/\D/g, '').slice(0, 10);
    }

    setDatosEmpleado((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));
  };

  const manejarAntiguedad = (nuevaFecha) => {
    setDatosEmpleado((prev) => ({
      ...prev,
      antiguedad: nuevaFecha,
    }));
  };

  const manejarFechaNacimiento = (nuevaFecha) => {
    setDatosEmpleado((prev) => ({
      ...prev,
      fechaNacimiento: nuevaFecha,
    }));
  };

  const obtenerHelperText = (campo) => {
    const err = erroresValidacion[campo];
    if (err) {
      return typeof err === 'string' ? err : CAMPO_OBLIGATORIO;
    }
    return '';
  };

  const handleGuardar = async () => {
    const datosProcesados = {
      ...datosEmpleado,
      antiguedad: datosEmpleado.antiguedad?.format?.('YYYY-MM-DD') || datosEmpleado.antiguedad,
      fechaNacimiento:
        datosEmpleado.fechaNacimiento?.format?.('YYYY-MM-DD') || datosEmpleado.fechaNacimiento,
    };

    const errores = validarDatosCrearEmpleado(datosProcesados) || {};

    if (Object.keys(errores).length > 0) {
      setErroresValidacion(errores);
      setAlerta({
        tipo: 'error',
        mensaje: 'Corrige los errores en el formulario antes de guardar.',
      });
      return { exito: false };
    }

    setErroresValidacion({});
    setAlerta(null);
    setCargando(true);

    try {
      const respuesta = await RepositorioCrearEmpleado.crear(datosProcesados);
      setAlerta({
        tipo: 'success',
        mensaje: 'Empleado creado correctamente',
      });
      limpiarFormulario();
      return {
        exito: true,
        mensaje: 'Empleado creado correctamente',
        datos: respuesta,
      };
    } catch (error) {
      setAlerta({
        tipo: 'error',
        mensaje: error.message || 'Error al guardar el empleado',
      });
      return { exito: false, mensaje: error.message || 'Error al guardar el empleado' };
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setDatosEmpleado(estadoInicial);
    setErroresValidacion({});
  };

  return {
    datosEmpleado,
    setDatosEmpleado,
    erroresValidacion,
    alerta,
    setAlerta,
    cargando,
    manejarCambio,
    manejarAntiguedad,
    manejarFechaNacimiento,
    obtenerHelperText,
    handleGuardar,
    limpiarFormulario,
    CAMPO_OBLIGATORIO,
  };
};
