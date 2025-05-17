import { Rol } from '@Modelos/Roles/Rol';

/**
 * Convierte una lista del backend en instancias del modelo Roles
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   roles: Rol[],
 *   mensaje: string
 * }}
 */
export function listaRoles(respuestaJson) {
  const { mensaje, roles } = respuestaJson; // Use "roles" instead of "listaRoles"

  if (!roles || !Array.isArray(roles)) {
    return { roles: [], mensaje: mensaje || '' };
  }

  const rolesMapped = roles.map((rol) => new Rol(rol.idRol, rol.nombre, rol.descripcion));
  return { roles: rolesMapped, mensaje };
}
