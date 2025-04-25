//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

import { Categoria } from './Categoria';

/**
 * Convierte una lista del backend en instancias del modelo Categoria
 * @param {Object} respuestaJson - JSON completo recibido del backend
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
