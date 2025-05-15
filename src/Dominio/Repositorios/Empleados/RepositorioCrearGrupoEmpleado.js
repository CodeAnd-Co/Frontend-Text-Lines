// RepositorioCrearGrupoEmpleado.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Envía los datos al backend para crear un grupo de empleados.
 * No lanza excepción en códigos 4xx/5xx. Devuelve { datos } o { error }.
 *
 * @param {Object} datos - Datos del nuevo grupo
 * @returns {Promise<Object>} - { datos } o { error }
 */
export const crearGrupoEmpleados = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/api/empleados/crear-grupo`, datos, {
      withCredentials: true,
      headers: { 'x-api-key': API_KEY },
      validateStatus: () => true,  
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return { error: response.data?.mensaje || 'Error inesperado al crear grupo' };
    }
  } catch (error) {
    return {
      error: 'Error de red o conexión con el servidor',
    };
  }
};