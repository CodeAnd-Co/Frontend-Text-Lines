import { Rol } from '../../modelos/Roles/Rol'; // Importa el modelo de Rol
import axios from 'axios'; // HTTP para peticiones a la API
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI'; // Rutas de la API

/**
 * RF7 - Consultar lista de roles - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
 *
 * @async
 * @function obtenerRoles
 * @returns {Promise<Object>} Objeto con la propiedad `roles`, que contiene una lista de instancias de Rol.
 */
export const obtenerRoles = async () => {
  const response = await axios.post(
    RUTAS_API.ROLES.CONSULTAR_LISTA,
    {},
    {
      withCredentials: true,
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    }
  );

  return {
    roles: response.data.roles.map((rol) => new Rol(rol)),
  };
};