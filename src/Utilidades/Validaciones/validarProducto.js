/**
 * Valida los campos del formulario para crear un producto.
 * Devuelve un objeto con los campos que tienen errores.
 * @param {Object} producto - Datos del producto (pueden venir de inputs de texto)
 * @returns {Object} errores - Campos con error
 */
export const validarProducto = (producto) => {
  const errores = {};

  // Validación de precio en puntos
  if (producto.precioPuntos == null || producto.precioPuntos === '') {
    errores.precioPuntos = 'El precio en puntos es obligatorio.';
  } else if (
    Number(producto.precioPuntos) <= 0 ||
    !Number.isInteger(Number(producto.precioPuntos))
  ) {
    errores.precioPuntos = 'El precio en puntos debe ser un número entero positivo.';
  } else if (!/^[1-9]\d{0,9}$/.test(producto.precioPuntos.toString())) {
    errores.precioPuntos = 'El precio en puntos debe tener máximo 10 dígitos.';
  }

  // Validación de precio para el cliente
  if (producto.precioCliente == null || producto.precioCliente === '') {
    errores.precioCliente = 'El precio para el cliente es obligatorio.';
  } else if (isNaN(producto.precioCliente)) {
    errores.precioCliente = 'El precio para el cliente debe ser un número válido.';
  } else if (Number(producto.precioCliente) <= 0) {
    errores.precioCliente = 'El precio para el cliente debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(producto.precioCliente.toString())) {
    errores.precioCliente = 'El precio para el cliente debe tener máximo 10 dígitos.';
  }

  // Validación de precio de venta
  if (producto.precioVenta == null || producto.precioVenta === '') {
    errores.precioVenta = 'El precio de venta es obligatorio.';
  } else if (isNaN(producto.precioVenta)) {
    errores.precioVenta = 'El precio de venta debe ser un número válido.';
  } else if (Number(producto.precioVenta) <= 0) {
    errores.precioVenta = 'El precio de venta debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(producto.precioVenta.toString())) {
    errores.precioVenta = 'El precio de venta debe tener máximo 10 dígitos.';
  }

  // Validación de costo
  if (producto.costo == null || producto.costo === '') {
    errores.costo = 'El costo es obligatorio.';
  } else if (isNaN(producto.costo)) {
    errores.costo = 'El costo debe ser un número válido.';
  } else if (Number(producto.costo) <= 0) {
    errores.costo = 'El costo debe ser un número positivo.';
  } else if (!/^[1-9]\d{0,7}(\.\d{1,2})?$/.test(producto.costo.toString())) {
    errores.costo = 'El costo debe tener máximo 10 dígitos.';
  }

  // Validación de impuesto
  if (producto.impuesto === false) {
    errores.impuesto = 'El impuesto no es válido o el campo está vacío.';
  }
  if (typeof producto.impuesto === 'number') {
    if (!/^(0|[1-9]\d{0,4})(\.\d{1,2})?$/.test(producto.impuesto.toString())) {
      errores.impuesto = 'El impuesto debe ser un número válido con máximo 5 dígitos.';
    }
  }
  // Validación de descuento

  if (producto.descuento > 100) {
    errores.descuento = 'El descuento debe estar entre 0 y 100.';
  }

  if (producto.descuento === false) {
    errores.descuento = 'El descuento no es válido o el campo está vacío.';
  }
  if (typeof producto.descuento === 'number') {
    if (!/^(0|[1-9]\d{0,4})(\.\d{1,2})?$/.test(producto.descuento.toString())) {
      errores.descuento = 'El descuento debe ser un número válido con máximo 5 dígitos.';
    }
  }

  return errores;
};
