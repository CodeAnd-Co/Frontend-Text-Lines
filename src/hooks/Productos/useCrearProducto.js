import { useState } from 'react';
import { RepositorioCrearProducto } from '@Repositorios/Productos/RepositorioCrearProducto';

/**
 * Hook `useCrearProducto`
 *
 * Maneja la lógica para crear un nuevo producto. Este hook realiza:
 * - Manejo del estado de errores
 * - Envío de los datos al backend usando el repositorio
 * - Manejo de errores y respuestas
 *
 * @returns {{
 *   errores: Object,
 *   handleGuardarProducto: Function
 * }}
 * Retorna el estado de errores y la función para guardar el producto
 */
export const useCrearProducto = () => {
  const [errores, setErrores] = useState({});

  const handleGuardarProducto = async ({
    producto,
    variantes,
    imagenProducto,
    imagenesVariantes,
  }) => {
    // Aquí podrías agregar validaciones adicionales si es necesario
    // const erroresValidacion = validarDatosCrearProducto(producto, variantes);
    // setErrores(erroresValidacion);
    // if (Object.keys(erroresValidacion).length > 0) return { exito: false };

    try {
      await RepositorioCrearProducto.crearProducto({
        productoRaw: producto,
        variantesRaw: variantes,
        imagenProducto,
        imagenesVariantes,
      });
      return { exito: true, mensaje: 'Producto creado correctamente' };
    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje || error.message || 'Hubo un error al crear el producto.';
      return { exito: false, mensaje };
    }
  };

  return {
    errores,
    handleGuardarProducto,
  };
};
