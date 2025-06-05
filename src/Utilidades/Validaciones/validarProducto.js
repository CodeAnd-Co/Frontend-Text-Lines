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
    precioPuntos: producto.precioPuntos ? producto.precioPuntos.toString() : '',
    precioCliente: producto.precioCliente ? producto.precioCliente.toString() : '',
    precioVenta: producto.precioVenta ? producto.precioVenta.toString() : '',
    costo: producto.costo ? producto.costo.toString() : '',
    impuesto: producto.impuesto ? producto.impuesto.toString() : '',
    descuento: producto.descuento ? producto.descuento.toString() : '',
  };

  //Validacion para Precio Puntos int
  if (normalizados.precioPuntos === '') {
    errores.precioPuntos = 'El precio en puntos es obligatorio.';
  } else if (Number(normalizados.precioPuntos) < 0) {
    errores.precioPuntos = 'El precio en puntos no puede ser negativo.';
  } else if (!/^\d+$/.test(normalizados.precioPuntos)) {
    errores.precioPuntos = 'El precio en puntos debe ser un número entero positivo.';
  }

  // Validación de precio para el cliente (decimal(10,2))
  if (normalizados.precioCliente === '') {
    errores.precioCliente = 'El precio para el cliente es obligatorio.';
  } else if (typeof normalizados.precioCliente !== 'number' || normalizados.precioCliente <= 0) {
    errores.precioCliente = 'El precio para el cliente debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(normalizados.precioCliente.toString())) {
    errores.precioCliente
      = 'El precio para el cliente debe tener máximo 8 dígitos antes del punto y 2 después, y no puede comenzar con 0.';
  }

  // Validación de precio de venta (decimal(10,2))
  if (normalizados.precioVenta === '') {
    errores.precioVenta = 'El precio de venta es obligatorio.';
  } else if (typeof normalizados.precioVenta !== 'number' || normalizados.precioVenta <= 0) {
    errores.precioVenta = 'El precio de venta debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(normalizados.precioVenta.toString())) {
    errores.precioVenta
      = 'El precio de venta debe tener máximo 8 dígitos antes del punto y 2 después, y no puede comenzar con 0.';
  }

  // Validación de costo (decimal(10,2))
  if (normalizados.costo === '') {
    errores.costo = 'El costo es obligatorio.';
  } else if (typeof normalizados.costo !== 'number' || normalizados.costo <= 0) {
    errores.costo = 'El costo debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(normalizados.costo.toString())) {
    errores.costo
      = 'El costo debe tener máximo 8 dígitos antes del punto y 2 después, y no puede comenzar con 0.';
  }

  // Validación de impuesto
  if (normalizados.impuesto == null) {
    errores.impuesto = 'El impuesto es obligatorio.';
  } else if (typeof normalizados.impuesto !== 'number' || normalizados.impuesto <= 0) {
    errores.impuesto = 'El impuesto debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(normalizados.impuesto.toString())) {
    errores.impuesto
      = 'El impuesto debe tener máximo 8 dígitos antes del punto y 2 después, y no puede comenzar con 0.';
  }

  // Validación de precio en puntos
  if (normalizados.precioPuntos == null) {
    errores.precioPuntos = 'El precio en puntos es obligatorio.';
  } else if (typeof normalizados.precioPuntos !== 'number' || normalizados.precioPuntos <= 0) {
    errores.precioPuntos = 'El precio en puntos debe ser un número entero positivo.';
  } else if (!/^[1-9]\d{0,9}$/.test(normalizados.precioPuntos.toString())) {
    errores.precioPuntos
      = 'El precio en puntos debe tener máximo 10 dígitos y no puede comenzar con 0.';
  }

  return errores;
};
