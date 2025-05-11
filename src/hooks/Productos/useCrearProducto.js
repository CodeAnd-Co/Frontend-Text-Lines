import { useState } from 'react';
import { RepositorioCrearProducto } from '@Repositorios/Productos/RepositorioCrearProducto';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';

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
  const [erroresProducto, setErroresProducto] = useState({});
  const [erroresVariantes, setErroresVariantes] = useState({});

  const guardarProducto = async ({ producto, variantes, imagenProducto, imagenesVariantes }) => {
    const erroresValidacionProducto = validarProducto(producto);
    setErroresProducto(erroresValidacionProducto);
    if (Object.keys(erroresValidacionProducto).length > 0) {
      return { exito: false, mensaje: 'Error en los campos de datos del producto' };
    }

    if (!imagenProducto) {
      return { exito: false, mensaje: 'Selecciona una imagen para el producto' };
    }

    if (!variantes || variantes.length === 0) {
      return { exito: false, mensaje: 'Crea al menos una variante del producto' };
    }

    const variantesSinOpciones = variantes.filter(
      (variante) => !Array.isArray(variante.opciones) || variante.opciones.length === 0
    );

    if (variantesSinOpciones.length > 0) {
      return { exito: false, mensaje: 'Cada variante debe tener al menos una opción' };
    }

    const erroresValidacionVariantes = validarVariantes(variantes);
    setErroresVariantes(erroresValidacionVariantes);

    if (Object.keys(erroresValidacionVariantes).length > 0) {
      return { exito: false, mensaje: 'Error en los campos de datos de variantes' };
    }

    // prettier-ignore
    if (
      !imagenesVariantes 
      || Object.keys(imagenesVariantes).length !== Object.keys(variantes).length 
      || Object.values(imagenesVariantes).some((lista) => !Array.isArray(lista) || lista.length === 0)
    ) {
      return { exito: false, mensaje: 'Selecciona al menos una imagen para cada variante' };
    }

    // prettier-ignore
    try {
      await RepositorioCrearProducto.crearProducto({
        productoRaw: producto,
        variantesRaw: variantes,
        imagenProducto,
        imagenesVariantes,
      });
      return { exito: true, mensaje: 'Producto creado correctamente' };
    } catch (error) {
      const mensaje 
      = error.response?.data?.mensaje || error.message || 'Hubo un error al crear el producto.';
      return { exito: false, mensaje };
    }
  };

  return {
    erroresProducto,
    erroresVariantes,
    guardarProducto,
  };
};
