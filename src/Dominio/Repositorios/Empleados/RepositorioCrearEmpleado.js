import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Envía los datos del usuario al backend para crear un nuevo registro.
 * @param {Object} datos - Datos ya validados y listos para enviar
 * @returns {Promise} respuesta del servidor
 */

export const RepositorioCrearEmpleado = async (datos) => {
  try {
    const response = await axios.post(`${BASE_EMPLEADOS}/crear`, datos, {
      withCredentials: true,
      headers: { 'x-api-key': API_KEY },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || 'Error al crear empleado en el servidor');
  }
};
