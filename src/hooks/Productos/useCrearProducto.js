//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { useState } from 'react';
import { RepositorioCrearProducto } from '@Repositorios/Productos/RepositorioCrearProducto';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const useCrearProducto = () => {
  const [erroresProducto, setErroresProducto] = useState({});
  const [erroresVariantes, setErroresVariantes] = useState({});

  const guardarProducto = async ({ producto, variantes, imagenProducto, imagenesVariantes }) => {
    const erroresValidacionProducto = validarProducto(producto);
    setErroresProducto(erroresValidacionProducto);

    const erroresValidacionVariantes = validarVariantes(variantes);
    setErroresVariantes(erroresValidacionVariantes);

    if (Object.keys(erroresValidacionProducto).length > 0 || Object.keys(erroresValidacionVariantes).length > 0) {
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

    if (imagenProducto.size > MAX_IMAGE_SIZE) {
      return {
        exito: false,
        mensaje: 'La imagen principal del producto no debe superar los 5MB de tamaño.',
      };
    }
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!tiposPermitidos.includes(imagenProducto.type)) {
      return {
        exito: false,
        mensaje: 'Solo se permiten imágenes en formato JPG, JPEG o PNG.',
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
        const archivo = imagen.file;

        // Validar tipo MIME
        if (!tiposPermitidos.includes(archivo.type)) {
          return {
            exito: false,
            mensaje: `La imagen "${archivo.name}" en la variante ${idVariante} no es un formato válido. Solo se permiten JPG, JPEG o PNG.`,
          };
        }

        // Validar tamaño
        if (archivo.size > MAX_IMAGE_SIZE) {
          return {
            exito: false,
            mensaje: `La imagen "${archivo.name}" en la variante ${idVariante} supera el límite de 5MB.`,
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
