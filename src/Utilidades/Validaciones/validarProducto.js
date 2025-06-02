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
    precioPuntos:
      producto.precioPuntos !== undefined ? Number(producto.precioPuntos) : producto.precioPuntos,
  };

  // Validación de precio para el cliente
  if (normalizados.precioCliente == null) {
    errores.precioCliente = 'El precio para el cliente es obligatorio.';
  } else if (typeof normalizados.precioCliente !== 'number' || normalizados.precioCliente <= 0) {
    errores.precioCliente = 'El precio para el cliente debe ser un número positivo.';
  } else if (!/^\d{1,8}(\.\d{1,2})?$/.test(normalizados.precioCliente.toString())) {
    errores.precioCliente =
      'El precio para el cliente debe tener máximo 8 dígitos antes del punto y 2 después.';
  }

  // Validación de precio de venta
  if (normalizados.precioVenta == null) {
    errores.precioVenta = 'El precio de venta es obligatorio.';
  } else if (typeof normalizados.precioVenta !== 'number' || normalizados.precioVenta <= 0) {
    errores.precioVenta = 'El precio de venta debe ser un número positivo.';
  } else if (!/^\d{1,8}(\.\d{1,2})?$/.test(normalizados.precioVenta.toString())) {
    errores.precioVenta =
      'El precio de venta debe tener máximo 8 dígitos antes del punto y 2 después.';
  }

  // Validación de costo
  if (normalizados.costo == null) {
    errores.costo = 'El costo es obligatorio.';
  } else if (typeof normalizados.costo !== 'number' || normalizados.costo <= 0) {
    errores.costo = 'El costo debe ser un número positivo.';
  } else if (!/^\d{1,8}(\.\d{1,2})?$/.test(normalizados.costo.toString())) {
    errores.costo = 'El costo debe tener máximo 8 dígitos antes del punto y 2 después.';
  }

  // Validación de impuesto
  if (normalizados.impuesto == null) {
    errores.impuesto = 'El impuesto es obligatorio.';
  } else if (typeof normalizados.impuesto !== 'number' || normalizados.impuesto < 0) {
    errores.impuesto = 'El impuesto debe ser un número positivo o cero.';
  } else if (!/^\d{1,10}(\.\d{1,2})?$/.test(normalizados.impuesto.toString())) {
    errores.impuesto = 'El impuesto debe tener máximo 10 dígitos antes del punto y 2 después.';
  }

  // Validación de precio en puntos
  if (normalizados.precioPuntos == null) {
    errores.precioPuntos = 'El precio en puntos es obligatorio.';
  } else if (typeof normalizados.precioPuntos !== 'number' || normalizados.precioPuntos <= 0) {
    errores.precioPuntos = 'El precio en puntos debe ser un número entero positivo.';
  } else if (!/^\d{1,10}$/.test(normalizados.precioPuntos.toString())) {
    errores.precioPuntos = 'El precio en puntos debe tener máximo 10 dígitos.';
  }

  // Validación de descuento
  if (normalizados.descuento == null) {
    errores.descuento = 'El descuento es obligatorio.';
  } else if (
    typeof normalizados.descuento !== 'number' ||
    normalizados.descuento < 0 ||
    normalizados.descuento > 100
  ) {
    errores.descuento = 'El descuento debe ser un número entre 0 y 100.';
  } else if (!/^\d{1,3}(\.\d{1,2})?$/.test(normalizados.descuento.toString())) {
    errores.descuento = 'El descuento debe tener máximo 3 dígitos antes del punto y 2 después.';
  }

  return errores;
};
