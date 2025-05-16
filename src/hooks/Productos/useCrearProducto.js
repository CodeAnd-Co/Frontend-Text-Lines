//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { useState } from 'react';
import { RepositorioCrearProducto } from '@Repositorios/Productos/RepositorioCrearProducto';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg'];

export const useCrearProducto = () => {
  const [erroresProducto, setErroresProducto] = useState({});
  const [erroresVariantes, setErroresVariantes] = useState({});

  const guardarProducto = async ({ producto, variantes, imagenProducto, imagenesVariantes }) => {
    console.log(producto);
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
        mensaje: 'Selecciona una imagen principal para el producto.',
      };
    }

    // Validar tipo de imagen principal
    if (!VALID_IMAGE_TYPES.includes(imagenProducto.type)) {
      return {
        exito: false,
        mensaje: 'La imagen principal debe ser formato JPG o JPEG.',
      };
    }

    if (imagenProducto.size > MAX_IMAGE_SIZE) {
      return {
        exito: false,
        mensaje: 'La imagen principal del producto no debe superar los 5MB de tamaño.',
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

    for (const [idVariante, listaImagenes] of Object.entries(imagenesVariantes)) {
      for (const imagen of listaImagenes) {
        // Validar tipo de imagen de variante
        if (!VALID_IMAGE_TYPES.includes(imagen.file.type)) {
          return {
            exito: false,
            mensaje: `La imagen "${imagen.file.name}" en la variante ${idVariante} debe ser JPG o JPEG.`,
          };
        }
        if (imagen.file.size > MAX_IMAGE_SIZE) {
          return {
            exito: false,
            mensaje: `La imagen "${imagen.file.name}" en la variante ${idVariante} supera el límite de 5MB.`,
          };
        }
      }
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
