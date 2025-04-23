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

export function ListaProductos(respuestaJson) {
  const { mensaje, productos } = respuestaJson;

  if (!productos) return { productos: [], mensaje: mensaje || '' };

  const listaProductos = productos.map((prod) => new Producto(prod));

  return { listaProductos, mensaje };
}
