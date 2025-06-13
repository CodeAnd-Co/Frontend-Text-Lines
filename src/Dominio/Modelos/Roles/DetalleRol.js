/**
 * @class DetalleRol
 * Representa el detalle completo de un rol en el sistema.
 */
export class DetalleRol {
  constructor({ idRol, nombre, descripcion, totalUsuarios, permisos }) {
    this.idRol = idRol ?? null;
    this.nombre = nombre ?? '';
    this.descripcion = descripcion ?? '';
    this.totalUsuarios = totalUsuarios ?? 0;
    this.permisos = permisos ?? [];
  }
}

/**
 * Convierte una respuesta JSON del backend en una instancia de DetalleRol.
 * @param {object} respuestaJson
 * @returns {DetalleRol}
 */
export function modeloDetalleRol(respuestaJson) {
  const { rol } = respuestaJson;
  return new DetalleRol(rol);
}