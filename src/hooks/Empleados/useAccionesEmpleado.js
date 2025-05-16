//RF19 - Actualizar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
import { useState } from 'react';
import dayjs from 'dayjs';
import { RepositorioActualizarEmpleado } from '@Repositorios/Empleados/RepositorioActualizarEmpleado';
import { validarDatosActualizarEmpleado } from '@Modelos/Empleados/ActualizarEmpleado';

export const useAccionesEmpleado = (empleadoInicial = null) => {
  const esEdicion = !!empleadoInicial;
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState(null);

  // Inicializar con datos de edición o vacío
  const [datosEmpleado, setDatosEmpleado] = useState(() => {
    if (esEdicion) {
      let fechaAntiguedad = null;
      if (empleadoInicial.antiguedadDate) {
        fechaAntiguedad = dayjs(empleadoInicial.antiguedadDate);
      }
      return {
        ...empleadoInicial,
        idEmpleado: empleadoInicial.id,
        nombreCompleto: empleadoInicial.nombreCompleto,
        correoElectronico: empleadoInicial.correoElectronico,
        antiguedad: fechaAntiguedad,
      };
    }

    return {
      nombre: '',
      nombreCompleto: '',
      correoElectronico: '',
      idEmpleado: '',
      idUsuario: '',
      numeroEmergencia: '',
      areaTrabajo: '',
      posicion: '',
      cantidadPuntos: '',
      antiguedad: null,
    };
  });

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  // Métodos para manejar cambios
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    if (name === 'numeroEmergencia') {
      const soloNumeros = value.replace(/\D/g, '').slice(0, 10);
      setDatosEmpleado((prev) => ({ ...prev, [name]: soloNumeros }));
    } else {
      setDatosEmpleado((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarAntiguedad = (nuevaFecha) => {
    setDatosEmpleado((prev) => ({
      ...prev,
      antiguedad: nuevaFecha,
    }));
  };

  const obtenerHelperText = (campo) => {
    const err = erroresValidacion[campo];
    if (err) {
      return typeof err === 'string' ? err : CAMPO_OBLIGATORIO;
    }
    if (
      !esEdicion &&
      [
        'idEmpleado',
        'idUsuario',
        'numeroEmergencia',
        'areaTrabajo',
        'posicion',
        'cantidadPuntos',
        'antiguedad',
      ].includes(campo)
    ) {
      return CAMPO_OBLIGATORIO;
    }
    return '';
  };

  const handleGuardar = async () => {
    const datosProcesados = {
      ...datosEmpleado,
      id: esEdicion ? empleadoInicial.id : datosEmpleado.idEmpleado,
      nombreCompleto: datosEmpleado.nombreCompleto || datosEmpleado.nombre,
      correoElectronico: datosEmpleado.correoElectronico,
      antiguedad: datosEmpleado.antiguedad?.format('YYYY-MM-DD'),
    };

    const erroresCampos = {};
    if (!datosProcesados.areaTrabajo || datosProcesados.areaTrabajo.trim() === '') {
      erroresCampos.areaTrabajo = 'El campo no puede estar vacío ni contener sólo espacios';
    }
    if (!datosProcesados.posicion || datosProcesados.posicion.trim() === '') {
      erroresCampos.posicion = 'El campo no puede estar vacío ni contener sólo espacios';
    }

    const nuevosErrores = {
      ...erroresCampos,
      ...validarDatosActualizarEmpleado(datosProcesados),
    };

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresValidacion(nuevosErrores);
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
      await RepositorioActualizarEmpleado.actualizar(datosProcesados);
      setAlerta({
        tipo: 'success',
        mensaje: esEdicion ? 'Empleado actualizado correctamente' : 'Empleado creado correctamente',
      });
      return {
        exito: true,
        mensaje: esEdicion ? 'Empleado actualizado correctamente' : 'Empleado creado correctamente',
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
    setDatosEmpleado({
      nombre: '',
      nombreCompleto: '',
      correoElectronico: '',
      idEmpleado: '',
      idUsuario: '',
      numeroEmergencia: '',
      areaTrabajo: '',
      posicion: '',
      cantidadPuntos: '',
      antiguedad: null,
    });
    setErroresValidacion({});
    setAlerta(null);
  };

  return {
    datosEmpleado,
    setDatosEmpleado,
    erroresValidacion,
    alerta,
    setAlerta,
    cargando,
    esEdicion,
    manejarCambio,
    manejarAntiguedad,
    obtenerHelperText,
    handleGuardar,
    limpiarFormulario,
    CAMPO_OBLIGATORIO,
  };
};
