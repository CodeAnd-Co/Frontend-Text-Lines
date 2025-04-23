import { Rol } from './Rol';

/**
 * Convierte una lista del backend en instancias del modelo Rol
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{ roles: Rol[], mensaje: string }}
 */
export function listaRoles(respuestaJson) {
  const { mensaje, roles } = respuestaJson;

  if (!roles) return { roles: [], mensaje: mensaje || '' };

  const lista = roles.map((r) => new Rol(r));
  return { roles: lista, mensaje };
}
