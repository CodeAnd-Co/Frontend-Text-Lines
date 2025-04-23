//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import { Producto } from './Producto';

/**
 * Convierte una lista del backend en instancias del modelo Categoria
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   productos: Producto[],
 *   mensaje: string
 * }}
 */

export function listaProductos(respuestaJson) {
  const { mensaje, listaProductos } = respuestaJson;

  if (!listaProductos) return { productos: [], mensaje: mensaje || '' };

  const productos = listaProductos.map((prod) => new Producto(prod));

  return { listaProductos, mensaje };
}
