import { useState } from 'react';
import { RepositorioCrearProveedor } from '@Repositorios/Proveedores/RepositorioCrearProveedor';
import { validarProveedor } from '@Utilidades/Validaciones/validarProveedor';
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
export const useCrearProveedor = () => {
  const [errores, setErrores] = useState({});

  const manejarGuardarProveeodor = async (datosProveedor) => {
    console.log(datosProveedor);
    const erroresValidacion = validarProveedor(datosProveedor);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return { exito: false };
    try {
      await RepositorioCrearProveedor.crearProveedor(datosProveedor);
      return { exito: true, mensaje: 'Proveedor creado correctamente' };
    } catch (error) {
      console.log(error)
      const mensaje = error.response?.data?.mensaje || 'Hubo un error al crear el proveedor.';
      return { exito: false, mensaje };
    }
  };

  return {
    errores,
    manejarGuardarProveeodor,
  };
};