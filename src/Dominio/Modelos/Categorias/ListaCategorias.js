import { Categoria } from '@SRC/Dominio/Modelos/Categorias/Categoria';
/**
 * Convierte una lista de categorías recibida del backend en instancias del modelo Categoria.
 * @param {Object} respuestaJson - JSON recibido del backend, que contiene las propiedades
 *                                 `mensaje` (string) y `listaCategoria` (array de categorías).
 * @returns {{
 *   categorias: Categoria[],
 *   mensaje: string
 * }}
 */
export function listaCategorias(respuestaJson) {
  const { mensaje, listaCategoria } = respuestaJson;

  if (!listaCategoria) return { categorias: [], mensaje: mensaje || '' };

  const categorias = listaCategoria.map((cat) => new Categoria(cat));

  return { categorias, mensaje };
}
