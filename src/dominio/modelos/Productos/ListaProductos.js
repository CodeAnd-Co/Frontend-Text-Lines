//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import { Producto } from '../producto';

/**
 * Convierte una lista del backend en instancias del modelo Categoria
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   productos: Producto[],
 *   mensaje: string
 * }}
 */

export function ListaProductos(respuestaJson) {
  const { mensaje, lista_productos } = respuestaJson;

  if (!lista_productos) return { productos: [], mensaje: mensaje || '' };

  const productos = lista_productos.map((prod) => new Producto(prod));

  return { productos, mensaje };
}
