import { useState } from 'react';
import dayjs from 'dayjs';
import { RepositorioActualizarUsuario } from '@Repositorios/Usuarios/RepositorioActualizarUsuario';
import { validarDatosActualizarUsuario } from '@Modelos/Usuarios/ActualizarUsuario';

export const useAccionesUsuario = (usuarioInicial = null) => {
  const esEdicion = !!usuarioInicial;
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState(null);

  // Inicializar con datos de edición o vacío
  const [datosUsuario, setDatosUsuario] = useState(() => {
    if (esEdicion) {
      let fechaNacimiento = null;
      if (usuarioInicial.fechaNacimiento) {
        fechaNacimiento = dayjs(usuarioInicial.fechaNacimiento);
      }
      return {
        ...usuarioInicial,
        idUsuario: usuarioInicial.idUsuario || usuarioInicial.id,
        nombreCompleto: usuarioInicial.nombreCompleto || '',
        apellido: usuarioInicial.apellido || '',
        correoElectronico: usuarioInicial.correoElectronico || '',
        numeroTelefono: usuarioInicial.numeroTelefono || '',
        direccion: usuarioInicial.direccion || '',
        fechaNacimiento,
        genero: usuarioInicial.genero || '',
        rol: usuarioInicial.rol || '',
        cliente: usuarioInicial.cliente || [],
        contrasenia: '',
      };
    }
    return {
      nombreCompleto: '',
      correoElectronico: '',
      contrasenia: '',
      numeroTelefono: '',
      direccion: '',
      fechaNacimiento: null,
      genero: '',
      rol: '',
      cliente: [],
    };
  });

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  // Métodos para manejar cambios
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarFechaNacimiento = (nuevaFecha) => {
    setDatosUsuario((prev) => ({
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
      ...datosUsuario,
      idUsuario: esEdicion ? usuarioInicial.idUsuario || usuarioInicial.id : datosUsuario.idUsuario,
      fechaNacimiento: datosUsuario.fechaNacimiento
        ? dayjs(datosUsuario.fechaNacimiento).format('YYYY-MM-DD')
        : null,
    };

    const nuevosErrores = validarDatosActualizarUsuario(datosProcesados);

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
      await RepositorioActualizarUsuario.actualizar(datosProcesados);
      setAlerta({
        tipo: 'success',
        mensaje: esEdicion ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
      });
      return {
        exito: true,
        mensaje: esEdicion ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
      };
    } catch (error) {
      setAlerta({
        tipo: 'error',
        mensaje: error.message || 'Error al guardar el usuario',
      });
      return { exito: false, mensaje: error.message || 'Error al guardar el usuario' };
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setDatosUsuario({
      nombreCompleto: '',
      correoElectronico: '',
      contrasenia: '',
      numeroTelefono: '',
      direccion: '',
      fechaNacimiento: null,
      genero: '',
      rol: '',
      cliente: [],
    });
    setErroresValidacion({});
    setAlerta(null);
  };

  return {
    datosUsuario,
    setDatosUsuario,
    erroresValidacion,
    alerta,
    setAlerta,
    cargando,
    esEdicion,
    manejarCambio,
    manejarFechaNacimiento,
    obtenerHelperText,
    handleGuardar,
    limpiarFormulario,
    CAMPO_OBLIGATORIO,
  };
};
