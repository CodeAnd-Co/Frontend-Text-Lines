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
    nombreComun: producto.nombreComun?.trim() || '',
    nombreComercial: producto.nombreComercial?.trim() || '',
    descripcion: producto.descripcion?.trim() || '',
    marca: producto.marca?.trim() || '',
    modelo: producto.modelo?.trim() || '',
    tipoProducto: producto.tipoProducto?.trim() || '',
    precioPuntos:
      producto.precioPuntos !== undefined ? Number(producto.precioPuntos) : producto.precioPuntos,
    precioCliente:
      producto.precioCliente !== undefined
        ? Number(producto.precioCliente)
        : producto.precioCliente,
    precioVenta:
      producto.precioVenta !== undefined ? Number(producto.precioVenta) : producto.precioVenta,
    costo: producto.costo !== undefined ? Number(producto.costo) : producto.costo,
    impuesto: producto.impuesto !== undefined ? Number(producto.impuesto) : producto.impuesto,
    descuento: producto.descuento !== undefined ? Number(producto.descuento) : producto.descuento,
    idProveedor:
      producto.idProveedor !== undefined
        ? parseInt(producto.idProveedor, 10)
        : producto.idProveedor,
    estado: producto.estado !== undefined ? Number(producto.estado) : producto.estado,
    envio: producto.envio !== undefined ? Number(producto.envio) : producto.envio,
  };

  // prettier-ignore
  if (normalizados.idProveedor == null) {
    errores.idProveedor = 'Selecciona un proveedor';
  } else if (
    typeof normalizados.idProveedor !== 'number' 
    || normalizados.idProveedor <= 0 
    || !Number.isInteger(normalizados.idProveedor)
  ) {
    errores.idProveedor = 'Selecciona un proveedor válido';
  }

  if (!normalizados.nombreComun) {
    errores.nombreComun = 'El nombre común es obligatorio';
  } else if (normalizados.nombreComun.length > 100) {
    errores.nombreComun = 'El nombre común debe tener máximo 100 caracteres';
  }

  if (!normalizados.nombreComercial) {
    errores.nombreComercial = 'El nombre comercial es obligatorio';
  } else if (normalizados.nombreComercial.length > 150) {
    errores.nombreComercial = 'El nombre comercial debe tener máximo 150 caracteres';
  }

  if (!normalizados.descripcion) {
    errores.descripcion = 'La descripción es obligatoria';
  } else if (normalizados.descripcion.length > 1000) {
    errores.descripcion = 'La descripción debe tener máximo 1000 caracteres';
  }

  if (!normalizados.marca) {
    errores.marca = 'La marca es obligatoria';
  } else if (normalizados.marca.length > 100) {
    errores.marca = 'La marca debe tener máximo 100 caracteres';
  }

  if (!normalizados.modelo) {
    errores.modelo = 'El modelo es obligatorio';
  } else if (normalizados.modelo.length > 100) {
    errores.modelo = 'El modelo debe tener máximo 100 caracteres';
  }

  if (!normalizados.tipoProducto) {
    errores.tipoProducto = 'El tipo de producto es obligatorio';
  } else if (normalizados.tipoProducto.length > 50) {
    errores.tipoProducto = 'El tipo de producto debe tener máximo 50 caracteres';
  }

  if (normalizados.precioPuntos == null || normalizados.precioPuntos < 0) {
    errores.precioPuntos = 'El precio en puntos debe ser un número positivo';
  } else if (!Number.isInteger(normalizados.precioPuntos)) {
    errores.precioPuntos = 'El precio en puntos debe ser un número entero';
  }

  if (normalizados.precioCliente == null) {
    errores.precioCliente = 'El precio para el cliente es obligatorio';
  } else if (typeof normalizados.precioCliente !== 'number' || normalizados.precioCliente <= 0) {
    errores.precioCliente = 'El precio para el cliente debe ser un número positivo';
  }

  if (normalizados.precioVenta == null) {
    errores.precioVenta = 'El precio de venta es obligatorio';
  } else if (typeof normalizados.precioVenta !== 'number' || normalizados.precioVenta <= 0) {
    errores.precioVenta = 'El precio de venta debe ser un número positivo';
  }

  if (normalizados.costo == null) {
    errores.costo = 'El costo es obligatorio';
  } else if (typeof normalizados.costo !== 'number' || normalizados.costo <= 0) {
    errores.costo = 'El costo debe ser un número positivo';
  }

  if (normalizados.impuesto == null) {
    errores.impuesto = 'El impuesto es obligatorio';
  } else if (typeof normalizados.impuesto !== 'number' || normalizados.impuesto <= 0) {
    errores.impuesto = 'El impuesto debe ser un número positivo';
  }

  // prettier-ignore
  if (normalizados.descuento == null) {
    errores.descuento = 'El descuento es obligatorio';
  } else if (
    typeof normalizados.descuento !== 'number' 
    || normalizados.descuento < 0 
    || normalizados.descuento > 100
  ) {
    errores.descuento = 'El descuento debe estar entre 0 y 100';
  }

  if (normalizados.estado == null) {
    errores.estado = 'El estado es obligatorio';
  } else if (![0, 1].includes(normalizados.estado)) {
    errores.estado = 'El estado debe ser 0 (inactivo) o 1 (activo)';
  }

  if (normalizados.envio == null) {
    errores.envio = 'El envío es obligatorio';
  } else if (![0, 1].includes(normalizados.envio)) {
    errores.envio = 'El envío debe ser 0 (no disponible) o 1 (disponible)';
  }

  return errores;
};
