import { useState } from 'react';
import { crearUsuario } from '../../dominio/repositorios/Usuarios/repositorioCrearUsuario';
import { validarDatosCrearUsuario } from '../../dominio/modelos/usuarios/modeloCrearUsuario';
/**
 * RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
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
  const [errores, setErrores] = useState({});

  const handleGuardarUsuario = async (datosUsuario) => {
    const erroresValidacion = validarDatosCrearUsuario(datosUsuario);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return { exito: false };

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
      idRol: datosUsuario.rol,
      idCliente: datosUsuario.cliente,
    };

    try {
      await crearUsuario(datosParaEnviar);
      return { exito: true, mensaje: 'Usuario creado correctamente' };
    } catch (error) {
      const mensaje
        = error.response?.data?.mensaje
        || 'Hubo un error al crear el usuario. Verifica que no exista.';
      return { exito: false, mensaje };
    }
  };

  return {
    errores,
    handleGuardarUsuario,
  };
};
