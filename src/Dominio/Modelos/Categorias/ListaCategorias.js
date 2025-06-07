import { Categoria } from '@Modelos/Categorias/Categoria';
/**
 * Convierte una lista de categorías recibida del backend en instancias del modelo Categoria.
 * @param {Object} respuestaJson - JSON recibido del backend, que contiene las propiedades
 *                                 `mensaje` (string) y `listaCategoria` (array de categorías).
 * @returns {{
 *   categorias: Categoria[],
 *   mensaje: string
 * }}
 * 
 * @see [RF[47] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */
export function listaCategorias(respuestaJson) {
  const { mensaje, listaCategoria } = respuestaJson;

  if (!listaCategoria) return { categorias: [], mensaje: mensaje || '' };

  const categorias = listaCategoria.map((cat) => new Categoria(cat));

  return { categorias, mensaje };
}
