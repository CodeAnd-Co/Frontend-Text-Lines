import axios from 'axios';

// URL base y clave API definidas en variables de entorno (.env).
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Envía los datos al backend para crear un grupo de empleados.
 *
 * @async
 * @function crearGrupoEmpleados
 * @param {object} datos - Objeto con los datos necesarios para crear el grupo de empleados.
 * @returns {Promise<object>} Un objeto con una de las siguientes estructuras:
 * - `{ datos }` si la creación fue exitosa.
 * - `{ error }` si ocurrió un fallo del lado del backend o de red.
 *
 * @description
 * Esta función realiza una petición `POST` a la API para registrar un nuevo grupo de empleados.
 * No lanza excepciones explícitas para errores HTTP (códigos 4xx o 5xx), gracias a `validateStatus`.
 * En su lugar, devuelve una estructura uniforme que puede ser manejada con facilidad por el frontend.
 *
 * En caso de éxito (status 2xx), retorna la respuesta completa.
 * En caso de error controlado (como validación o permisos), retorna un objeto con la propiedad `error`.
 * En caso de fallo de red o conexión, devuelve un mensaje genérico.
 */
export const crearGrupoEmpleados = async (datos) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/empleados/crear-grupo`,
      datos,
      {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
        validateStatus: () => true, // No lanza excepción por status 4xx/5xx.
      },
    );

    // Respuesta exitosa (2xx): retorna los datos recibidos.
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    // Error del servidor o validación: retorna el mensaje recibido o uno genérico.
    return {
      error: response.data?.mensaje || 'Error inesperado al crear grupo',
    };
    } catch {
    return {
        error: 'Error de red o conexión con el servidor',
    };
    }
};