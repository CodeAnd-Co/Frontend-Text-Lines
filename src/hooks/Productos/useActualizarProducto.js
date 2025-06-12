//RF [29] Actualiza Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29]
import { useState } from 'react';
import { RepositorioActualizarProducto } from '@Repositorios/Productos/RepositorioActualizarProducto';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const useActualizarProducto = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const actualizarProducto = async (datosProducto) => {
    setCargando(true);
    setError(null);

    try {
      // Validar producto
      const erroresProducto = validarProducto(datosProducto.productoRaw);
      if (Object.keys(erroresProducto).length > 0) {
        setError(erroresProducto);
        setCargando(false);
        return { exito: false, mensaje: 'Hay errores en los datos del producto' };
      }

      // Validar variantes - necesitamos formatear los datos primero
      const variantesConIdentificador = {};
      datosProducto.variantesRaw.forEach((variante) => {
        variantesConIdentificador[variante.identificador] = {
          ...variante,
          identificador: variante.identificador,
        };
      });

      const erroresVariantes = validarVariantes(variantesConIdentificador);
      if (Object.keys(erroresVariantes).length > 0) {
        setError(erroresVariantes);
        setCargando(false);
        return { exito: false, mensaje: 'Hay errores en los datos de las variantes' };
      }

      // Llamar al repositorio para actualizar el producto
      const respuesta = await RepositorioActualizarProducto.actualizarProducto(datosProducto);
      setCargando(false);
      return { ...respuesta, exito: true };
    } catch (error) {
      setError(error.message);
      setCargando(false);
      return { exito: false, mensaje: error.message || 'Error al actualizar el producto' };
    }
  };
  return {
    cargando,
    error,
    actualizarProducto,
  };
};
