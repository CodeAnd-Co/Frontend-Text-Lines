//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

import { Usuario } from '@Modelos/Usuarios/Usuario';

/**
 * Convierte una lista del backend en instancias del modelo Usuario
 * @param {Object} respuestaJson - JSON completo recibido del backend
 * @returns {{
 *   usuarios: Usuario[],
 *   mensaje: string
 * }}
 */
export function listaUsuarios(respuestaJson) {
  const { mensaje, listaUsuarios } = respuestaJson;

  if (!listaUsuarios) return { usuarios: [], mensaje: mensaje || '' };

  const usuarios = listaUsuarios.map((cat) => new Usuario(cat));

  return { usuarios, mensaje };
}
