import { SetProductos } from './SetProductos';

/**
 * Convierte una lista de sets de productos recibida del backend en instancias del modelo SetProductos.
 *
 * @param {Object} respuestaJson - JSON recibido del backend, que contiene las propiedades
 *                                 `mensaje` (string) y `setsDeProductos` (array de sets de productos).
 * @returns {{
 *   setsDeProductos: SetProductos[],
 *   mensaje: string
 * }}
 *
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos -
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 */
export function listaSetsProductos(respuestaJson) {
  const { mensaje, setsProductos } = respuestaJson;

  if (!setsProductos) return { setsDeProductos: [], mensaje: mensaje || '' };

  const setsDeProductos = setsProductos.map((producto) => new SetProductos(producto));

  return { setsDeProductos, mensaje };
}
