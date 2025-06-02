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
    precioCliente:
      producto.precioCliente !== undefined
        ? Number(producto.precioCliente)
        : producto.precioCliente,
    precioVenta:
      producto.precioVenta !== undefined ? Number(producto.precioVenta) : producto.precioVenta,
    costo: producto.costo !== undefined ? Number(producto.costo) : producto.costo,
    impuesto: producto.impuesto !== undefined ? Number(producto.impuesto) : producto.impuesto,
    descuento: producto.descuento !== undefined ? Number(producto.descuento) : producto.descuento,
  };

  // Validación de precio para el cliente (decimal(10,2))
  if (normalizados.precioCliente == null) {
    errores.precioCliente = 'El precio para el cliente es obligatorio.';
  } else if (typeof normalizados.precioCliente !== 'number' || normalizados.precioCliente <= 0) {
    errores.precioCliente = 'El precio para el cliente debe ser un número positivo.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.precioCliente.toString())) {
    errores.precioCliente =
      'El precio para el cliente debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de precio de venta (decimal(10,2))
  if (normalizados.precioVenta == null) {
    errores.precioVenta = 'El precio de venta es obligatorio.';
  } else if (typeof normalizados.precioVenta !== 'number' || normalizados.precioVenta <= 0) {
    errores.precioVenta = 'El precio de venta debe ser un número positivo.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.precioVenta.toString())) {
    errores.precioVenta =
      'El precio de venta debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de costo (decimal(10,2))
  if (normalizados.costo == null) {
    errores.costo = 'El costo es obligatorio.';
  } else if (typeof normalizados.costo !== 'number' || normalizados.costo <= 0) {
    errores.costo = 'El costo debe ser un número positivo.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.costo.toString())) {
    errores.costo = 'El costo debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de impuesto (decimal(5,2))
  if (normalizados.impuesto == null) {
    errores.impuesto = 'El impuesto es obligatorio.';
  } else if (typeof normalizados.impuesto !== 'number' || normalizados.impuesto < 0) {
    errores.impuesto = 'El impuesto debe ser un número positivo o cero.';
  } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(normalizados.impuesto.toString())) {
    errores.impuesto = 'El impuesto debe tener máximo 5 dígitos antes del punto y 2 después.';
  }

  // Validación de descuento (decimal(5,2))
  if (normalizados.descuento == null) {
    errores.descuento = 'El descuento es obligatorio.';
  } else if (
    typeof normalizados.descuento !== 'number' ||
    normalizados.descuento < 0 ||
    normalizados.descuento > 100
  ) {
    errores.descuento = 'El descuento debe ser un número entre 0 y 100.';
  } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(normalizados.descuento.toString())) {
    errores.descuento = 'El descuento debe tener máximo 5 dígitos antes del punto y 2 después.';
  }

  return errores;
};
