//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

import axios from 'axios';
import { listaUsuarios } from '@Modelos/Usuarios/ListaUsuarios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarListaUsuarios {
  /**
   * Obtiene la lista de usuarios desde la API
   * @returns {Promise<{usuarios: Usuario[], mensaje: string}>}
   */
  async obtenerLista() {
    this;
    try {
      const respuesta = await axios.post(
        RUTAS_API.USUARIOS.CONSULTAR_LISTA,
        {},
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      return listaUsuarios(respuesta.data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener la lista de usuarios';
      throw new Error(mensaje);
    }
  }
}
