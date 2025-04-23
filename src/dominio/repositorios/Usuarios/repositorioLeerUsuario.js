import axios from "axios";
import { UsuarioLectura } from "../../modelos/Usuarios/UsuarioLectura";
import { RUTAS_API } from "../../../Utilidades/Constantes/rutasAPI";

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioUsuarios {
  /**
   * Consulta los datos de un usuario específico por ID
   * @param {number} idUsuario - ID del usuario a consultar
   * @returns {Promise<{usuario: UsuarioLectura, mensaje: string}>}
   */
  async obtenerPorId(idUsuario) {
    console.log("📤 [RepositorioUsuarios] Enviando solicitud para ID:", idUsuario);

    try {
      const respuesta = await axios.post(
        RUTAS_API.USUARIOS.CONSULTAR_LISTA,
        { idUsuario },
        {
          withCredentials: true,
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      console.log("📬 [RepositorioUsuarios] Respuesta del backend:", respuesta.data);

      const { usuario, mensaje } = respuesta.data;

      const usuarioInstancia = new UsuarioLectura(usuario);

      console.log("🧱 [RepositorioUsuarios] Usuario instanciado correctamente:", usuarioInstancia);

      return {
        usuario: usuarioInstancia,
        mensaje,
      };
    } catch (error) {
      console.error("❌ [RepositorioUsuarios] Error al obtener usuario:", error);
      const mensaje
        = error.response?.data?.mensaje || "Error al obtener datos del usuario.";
      throw new Error(mensaje);
    }
  }
}