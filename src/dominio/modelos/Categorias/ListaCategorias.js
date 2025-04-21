import { Categoria } from "./Categoria";

/**
 * Convierte una lista del backend en instancias del modelo Categoria
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   categorias: Categoria[],
 *   mensaje: string
 * }}
 */
export function ListaCategorias(respuestaJson) {

  const { mensaje, lista_categorias } = respuestaJson;

  if (!lista_categorias) return { categorias: [], mensaje: mensaje || "" };

  const categorias = lista_categorias.map(cat => new Categoria(cat));

  return { categorias, mensaje };
}