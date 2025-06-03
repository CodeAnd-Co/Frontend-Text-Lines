/**
 * Valida los campos del formulario para crear un producto.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} producto - Datos del producto (pueden venir de inputs de texto)
 * @returns {Object} errores - Campos con error
 */
export const validarProducto = (producto) => {
  const errores = {};

  const normalizados = {
    ...producto,
    precioCliente: producto.precioCliente ? producto.precioCliente.toString() : '',
    precioVenta: producto.precioVenta ? producto.precioVenta.toString() : '',
    costo: producto.costo ? producto.costo.toString() : '',
    impuesto: producto.impuesto ? producto.impuesto.toString() : '',
    descuento: producto.descuento ? producto.descuento.toString() : '',
  };

  // Validación de precio para el cliente (decimal(10,2))
  if (normalizados.precioCliente === '') {
    errores.precioCliente = 'El precio para el cliente es obligatorio.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.precioCliente)) {
    errores.precioCliente =
      'El precio para el cliente debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de precio de venta (decimal(10,2))
  if (normalizados.precioVenta === '') {
    errores.precioVenta = 'El precio de venta es obligatorio.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.precioVenta)) {
    errores.precioVenta =
      'El precio de venta debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de costo (decimal(10,2))
  if (normalizados.costo === '') {
    errores.costo = 'El costo es obligatorio.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.costo)) {
    errores.costo = 'El costo debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de impuesto (decimal(5,2)), puede ser 0 o mayor, pero no menor a 0
  if (normalizados.impuesto !== '' && !/^\d{1,5}(\.\d{1,2})?$/.test(normalizados.impuesto)) {
    errores.impuesto = 'El impuesto debe tener máximo 5 dígitos antes del punto y 2 después.';
  } else if (Number(normalizados.impuesto) < 0) {
    errores.impuesto = 'El impuesto no puede ser menor a 0.';
  }

  // Validación de descuento (decimal(5,2)), puede ser 0 o mayor, pero no menor a 0
  if (normalizados.descuento !== '' && !/^\d{1,5}(\.\d{1,2})?$/.test(normalizados.descuento)) {
    errores.descuento = 'El descuento debe tener máximo 5 dígitos antes del punto y 2 después.';
  } else if (Number(normalizados.descuento) < 0) {
    errores.descuento = 'El descuento no puede ser menor a 0.';
  }

  return errores;
};
