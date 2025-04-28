// Capa de Infraestructura: Encapsula llamadas HTTP para crear un usuario

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Envía los datos del usuario al backend para crear un nuevo registro.
 * @param {Object} datos - Datos ya validados y listos para enviar
 * @returns {Promise} respuesta del servidor
 */
export const crearUsuario = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/api/usuarios/crear`, datos, {
      withCredentials: true,
      headers: { 'x-api-key': API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error en la llamada crearUsuario:', error);

    throw new Error(error.response?.data?.mensaje || 'Error al crear usuario en el servidor');
  }
};
