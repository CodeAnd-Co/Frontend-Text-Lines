//RF[03] Leer usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3]

import axios from 'axios';
import { UsuarioLectura } from '../../modelos/Usuarios/UsuarioLectura';
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioUsuarios {
  /**
   * Consulta los datos de un usuario específico por ID
   * @param {number} idUsuario - ID del usuario a consultar
   * @returns {Promise<{usuario: UsuarioLectura, mensaje: string}>}
   */
  async obtenerPorId(idUsuario) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.USUARIOS.CONSULTAR_USUARIO,
        { idUsuario },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      const { usuario, mensaje } = respuesta.data;

      const usuarioInstancia = new UsuarioLectura(usuario);

      return {
        usuario: usuarioInstancia,
        mensaje,
      };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener datos del usuario.';
      throw new Error(mensaje);
    }
  }
}