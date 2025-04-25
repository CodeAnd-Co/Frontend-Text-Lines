import { useState } from 'react';
import { crearUsuario } from '../dominio/repositorios/repositorioCrearUsuario';
import { validarDatosCrearUsuario } from '../dominio/modelos/modeloCrearUsuario';
/**
 * Hook `useCrearUsuario`
 *
 * Maneja la lógica para crear un nuevo usuario. Este hook realiza:
 * - Manejo del estado del formulario (datos del usuario)
 * - Control de apertura y cierre del modal
 * - Validación de datos usando la capa de dominio
 * - Envío de los datos al backend usando el repositorio (infraestructura)
 * - Manejo de errores visuales por campo
 *
 * @returns {{
 *   open: boolean,
 *   datosUsuario: Object,
 *   errores: Object,
 *   setDatosUsuario: Function,
 *   handleOpen: Function,
 *   handleClose: Function,
 *   handleGuardarUsuario: Function
 * }}
 * Retorna todo el estado y funciones necesarios para usar el formulario de creación de usuario.
 */
export const useCrearUsuario = () => {
  const [open, setOpen] = useState(false);
  const [errores, setErrores] = useState({});

  const [datosUsuario, setDatosUsuario] = useState({
    nombreCompleto: '',
    apellido: '',
    correoElectronico: '',
    contrasenia: '',
    confirmarContrasenia: '',
    numeroTelefono: '',
    direccion: '',
    codigoPostal: '',
    fechaNacimiento: null,
    genero: '',
    cliente: '',
    rol: '',
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setDatosUsuario({
      nombreCompleto: '',
      apellido: '',
      correoElectronico: '',
      contrasenia: '',
      confirmarContrasenia: '',
      numeroTelefono: '',
      direccion: '',
      fechaNacimiento: null,
      genero: '',
      cliente: '',
      rol: '',
    });
    setErrores({});
  };

  const handleGuardarUsuario = async () => {
    const erroresValidacion = validarDatosCrearUsuario(datosUsuario);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return { exito: false };

    const rolMap = {
      'Super Administrador': 1,
      Administrador: 2,
      Supervisor: 3,
      Nada: 4,
    };

    const clienteMap = {
      Toyota: 101,
      Otro: 102,
    };

    const datosParaEnviar = {
      nombreCompleto: `${datosUsuario.nombreCompleto} ${datosUsuario.apellido}`,
      correoElectronico: datosUsuario.correoElectronico,
      contrasenia: datosUsuario.contrasenia,
      numeroTelefono: datosUsuario.numeroTelefono,
      direccion: datosUsuario.direccion,
      fechaNacimiento: datosUsuario.fechaNacimiento
        ? datosUsuario.fechaNacimiento.format('YYYY-MM-DD')
        : null,
      genero: datosUsuario.genero,
      estatus: true,
      idRol: rolMap[datosUsuario.rol],
      idCliente: clienteMap[datosUsuario.cliente],
    };

    try {
      await crearUsuario(datosParaEnviar);
      handleClose();
      return { exito: true, mensaje: 'Usuario creado correctamente' };
    } catch (error) {
      const mensaje
        = error.response?.data?.mensaje
        || 'Hubo un error al crear el usuario. Verifica que no exista.';
      handleClose();
      return { exito: false, mensaje };
    }
  };

  return {
    open,
    datosUsuario,
    errores,
    setDatosUsuario,
    handleOpen,
    handleClose,
    handleGuardarUsuario,
  };
};
