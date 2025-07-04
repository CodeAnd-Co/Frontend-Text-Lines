/**
 * Valida las variantes y sus opciones en el formulario de producto.
 * Devuelve un objeto con los errores por cada variante identificada.
 * @param {Object} variantes - Objeto con variantes y sus opciones
 * @returns {Object} nuevosErrores - Errores por variante y opción
 */
export const validarVariantes = (variantes) => {
  const nuevosErrores = {};

  for (const variante of Object.values(variantes)) {
    const erroresVariante = {};
    const identificador = variante.identificador;

    const normalizados = {
      ...variante,
      nombreVariante: variante.nombreVariante?.trim() || '',
      descripcion: variante.descripcion?.trim() || '',
      opciones: Array.isArray(variante.opciones) ? variante.opciones : [],
    };

    if (!normalizados.nombreVariante) {
      erroresVariante.nombreVariante = 'El nombre de la variante es obligatorio';
    } else if (normalizados.nombreVariante.length < 3) {
      erroresVariante.nombreVariante = 'El nombre debe tener al menos 3 caracteres';
    } else if (normalizados.nombreVariante.length > 100) {
      erroresVariante.nombreVariante = 'El nombre debe tener máximo 100 caracteres';
    }

    if (!normalizados.descripcion) {
      erroresVariante.descripcion = 'La descripción de la variante es obligatoria';
    } else if (normalizados.descripcion.length > 300) {
      erroresVariante.descripcion = 'La descripción debe tener máximo 300 caracteres';
    }

    const erroresOpciones = {};

    normalizados.opciones.forEach((opcion, index) => {
      const erroresOpcion = {};

      if (!opcion.valorOpcion?.trim()) {
        erroresOpcion.valorOpcion = 'El valor de la opción es obligatorio';
      } else if (opcion.valorOpcion.trim().length > 50) {
        erroresOpcion.valorOpcion = 'El valor de la opción debe tener máximo 50 caracteres';
      }

      // Validación de cantidad
      if (!Number.isFinite(opcion.cantidad) || opcion.cantidad <= 0) {
        erroresOpcion.cantidad = 'La cantidad debe ser un número mayor a 0';
      } else if (!/^\d{1,10}$/.test(opcion.cantidad.toString())) {
        erroresOpcion.cantidad = 'La cantidad debe tener máximo 10 dígitos.';
      }

      // Validación de descuento
      if (opcion.descuento > 100) {
        erroresOpcion.descuento = 'El descuento debe estar entre 0 y 100.';
      }

      if (opcion.descuento === false) {
        erroresOpcion.descuento = 'El descuento no es válido o el campo está vacío.';
      }
      if (typeof opcion.descuento === 'number') {
        if (!/^(0|[1-9]\d{0,4})(\.\d{1,2})?$/.test(opcion.descuento.toString())) {
          erroresOpcion.descuento = 'El descuento debe ser un número válido con máximo 5 dígitos.';
        }
      }

      // Validación de costo adicional con formato (10,2)
      if (!Number.isFinite(opcion.costoAdicional) || opcion.costoAdicional < 0) {
        erroresOpcion.costoAdicional = 'El costo adicional no es válido o el campo está vacío.';
      } else if (!/^\d{1,8}(\.\d{1,2})?$/.test(opcion.costoAdicional.toString())) {
        erroresOpcion.costoAdicional = 'El costo adicional debe tener máximo 10 dígitos.';
      }

      if (!opcion.SKUautomatico?.trim()) {
        erroresOpcion.SKUautomatico = 'El SKU automático es obligatorio';
      } else if (opcion.SKUautomatico.trim().length > 50) {
        erroresOpcion.SKUautomatico = 'El SKU automático debe tener máximo 50 caracteres';
      }

      if (!opcion.SKUcomercial?.trim()) {
        erroresOpcion.SKUcomercial = 'El SKU comercial es obligatorio';
      } else if (opcion.SKUcomercial.trim().length > 50) {
        erroresOpcion.SKUcomercial = 'El SKU comercial debe tener máximo 50 caracteres';
      }

      if (Object.keys(erroresOpcion).length > 0) {
        erroresOpciones[index] = erroresOpcion;
      }
    });

    if (Object.keys(erroresOpciones).length > 0) {
      erroresVariante.opciones = erroresOpciones;
    }

    if (Object.keys(erroresVariante).length > 0) {
      nuevosErrores[identificador] = erroresVariante;
    }
  }

  return nuevosErrores;
};
