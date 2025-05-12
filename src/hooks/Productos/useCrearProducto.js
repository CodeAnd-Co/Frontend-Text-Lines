//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { useState } from 'react';
import { RepositorioCrearProducto } from '@Repositorios/Productos/RepositorioCrearProducto';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';

export const useCrearProducto = () => {
  const [erroresProducto, setErroresProducto] = useState({});
  const [erroresVariantes, setErroresVariantes] = useState({});

  const guardarProducto = async ({ producto, variantes, imagenProducto, imagenesVariantes }) => {
    const erroresValidacionProducto = validarProducto(producto);
    setErroresProducto(erroresValidacionProducto);
    if (Object.keys(erroresValidacionProducto).length > 0) {
      return {
        exito: false,
        mensaje: 'Por favor revisa los campos del producto. Algunos datos no son válidos.',
      };
    }

    if (!imagenProducto) {
      return {
        exito: false,
        mensaje: 'Debes seleccionar una imagen principal para el producto.',
      };
    }

    if (!variantes || variantes.length === 0) {
      return {
        exito: false,
        mensaje: 'Agrega al menos una variante para continuar con el registro del producto.',
      };
    }

    const variantesSinOpciones = variantes.filter(
      (variante) => !Array.isArray(variante.opciones) || variante.opciones.length === 0
    );

    if (variantesSinOpciones.length > 0) {
      return {
        exito: false,
        mensaje: 'Cada variante debe incluir al menos una opción disponible.',
      };
    }

    const erroresValidacionVariantes = validarVariantes(variantes);
    setErroresVariantes(erroresValidacionVariantes);

    if (Object.keys(erroresValidacionVariantes).length > 0) {
      return {
        exito: false,
        mensaje:
          'Revisa los campos de las variantes. Algunos datos son inválidos o están incompletos.',
      };
    }

    // prettier-ignore
    if (
      !imagenesVariantes 
      || Object.keys(imagenesVariantes).length !== Object.keys(variantes).length 
      || Object.values(imagenesVariantes).some((lista) => !Array.isArray(lista) || lista.length === 0)
    ) {
      return {
        exito: false,
        mensaje: 'Cada variante debe tener al menos una imagen seleccionada.',
      };
    }

    // prettier-ignore
    try {
      await RepositorioCrearProducto.crearProducto({
        productoRaw: producto,
        variantesRaw: variantes,
        imagenProducto,
        imagenesVariantes,
      });
      return {
        exito: true,
        mensaje: 'El producto se ha creado correctamente.',
      };
    } catch (error) {
      const mensaje 
        = error.response?.data?.mensaje 
        || error.message 
        || 'Ocurrió un error inesperado al crear el producto.';
      return { exito: false, mensaje };
    }
  };

  return {
    erroresProducto,
    erroresVariantes,
    guardarProducto,
  };
};
