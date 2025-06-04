import { useState } from 'react';
import dayjs from 'dayjs';
import { RepositorioActualizarUsuario } from '@Repositorios/Usuarios/RepositorioActualizarUsuario';
import { validarDatosActualizarUsuario } from '@Modelos/Usuarios/ActualizarUsuario';

export const useAccionesUsuario = (usuarioInicial = null) => {
  const esEdicion = !!usuarioInicial;
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const [datosUsuario, setDatosUsuario] = useState(() => {
    if (esEdicion) {
      let fechaNacimiento = null;
      if (usuarioInicial.fechaNacimiento) {
        fechaNacimiento = dayjs(usuarioInicial.fechaNacimiento);
      }

      let genero = '';
      if (usuarioInicial.genero) {
        if (usuarioInicial.genero.toLowerCase() === 'femenino') genero = 'Mujer';
        else if (usuarioInicial.genero.toLowerCase() === 'masculino') genero = 'Hombre';
        else genero = 'Otro';
      }

      let idRol = usuarioInicial.idRol ?? '';
      if (typeof usuarioInicial.rol === 'string') {
        const rolesMap = {
          'Super Administrador': 1,
          Administrador: 2,
        };
        idRol = rolesMap[usuarioInicial.rol] || '';
      } else if (usuarioInicial.rol) {
        idRol = usuarioInicial.rol;
      }

      return {
        nombreCompleto: usuarioInicial.nombreCompleto ?? '',
        apellido: usuarioInicial.apellido ?? '',
        correoElectronico: usuarioInicial.correoElectronico ?? '',
        contrasenia: '',
        confirmarContrasenia: '',
        numeroTelefono: usuarioInicial.numeroTelefono ?? '',
        direccion: usuarioInicial.direccion ?? '',
        fechaNacimiento,
        genero,
        idRol: idRol ?? '',
        cliente: usuarioInicial.cliente ?? [],
        estatus: usuarioInicial.estatus !== undefined ? usuarioInicial.estatus : 1,
      };
    }
    return {
      nombreCompleto: '',
      apellido: '',
      correoElectronico: '',
      contrasenia: '',
      confirmarContrasenia: '',
      numeroTelefono: '',
      direccion: '',
      fechaNacimiento: null,
      genero: '',
      idRol: '',
      cliente: [],
      estatus: 1,
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
      nombreCompleto: datosUsuario.nombreCompleto,
      apellido: datosUsuario.apellido,
    };

    console.log('Enviando al backend:', datosProcesados);

    const nuevosErrores = validarDatosActualizarUsuario(datosProcesados);

    console.log('Errores de validación:', nuevosErrores);

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
      idrol: '',
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
