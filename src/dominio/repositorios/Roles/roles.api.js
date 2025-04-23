import { Rol } from '../../modelos/Roles/Rol'; // Importa el modelo de Rol
import axios from 'axios'; // HTTP para peticiones a la API
import { RUTAS_API } from '../../../Utilidades/Constantes/rutasAPI'; // Rutas de la API

/**
 * RF7 - Consultar lista de roles - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
 *
 * @async
 * @function obtenerRoles
 * @param {Object} parametros - Parámetros de paginación.
 * @param {number} parametros.limit - Número máximo de resultados.
 * @param {number} parametros.offset - Número de registros a omitir.
 * @returns {Promise<Object>} Objeto con la propiedad `roles`, que contiene una lista de instancias de Rol.
 */
export const obtenerRoles = async ({ limit, offset }) => {
  // Realiza la petición POST al backend para obtener los roles
  const response = await axios.post(
    RUTAS_API.ROLES.CONSULTAR_LISTA,
    { limit, offset },
    {
      withCredentials: true,
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY, // Incluye la API key en el header
      },
    }
  );

  // Convierte los datos obtenidos en instancias del modelo Rol
  return {
    roles: response.data.roles.map((rol) => new Rol(rol)), // Mapea los roles a instancias del modelo Rol
  };
};