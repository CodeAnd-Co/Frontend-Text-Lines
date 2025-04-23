import { Usuario } from './Usuario';

/**
 * Convierte una lista del backend en instancias del modelo Usuario
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   usuarios: Usuario[],
 *   mensaje: string
 * }}
 */
export function ListaUsuarios(respuestaJson) {
  const { mensaje, lista_usuarios } = respuestaJson;

  if (!lista_usuarios) return { usuarios: [], mensaje: mensaje || '' };

  const usuarios = lista_usuarios.map((cat) => new Usuario(cat));

  return { usuarios, mensaje };
}
