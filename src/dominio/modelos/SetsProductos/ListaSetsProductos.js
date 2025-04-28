//RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
import { SetProductos } from './SetProductos';

export function listaSetsProductos(respuestaJson) {
  const { mensaje, setsProductos } = respuestaJson;

  if (!setsProductos) return { setsProductos: [], mensaje: mensaje || '' };

  const setsProductosFinal = setsProductos.map((cat) => new SetProductos(cat));

  return { setsProductos: setsProductosFinal, mensaje };
}
