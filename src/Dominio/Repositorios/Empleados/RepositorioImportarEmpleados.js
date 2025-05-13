import { RUTAS_API } from '@Constantes/rutasAPI';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Envía un arreglo de empleados al backend para su importación masiva.
 *
 * @param {Object[]} empleados - Array de objetos con los datos ya parseados del CSV.
 * @returns {Promise<Object>} La respuesta del servidor (puede incluir lista de errores parciales).
 * @throws {Error} Si la petición falla o devuelve un mensaje de error.
 * @see [RF[23]] Importar Empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF57])
 */
export const importarEmpleados = async (empleados) => {
  try {
    const respuesta = await axios.post(
      RUTAS_API.EMPLEADOS.IMPORTAR_EMPLEADOS,
      empleados,
      {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
      }
    );
    return respuesta.data;
  } catch (error) {
    throw new Error(
      error.respuesta?.data?.mensaje
       || 'Error al importar empleados en el servidor'
    );
  }
};