import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Solicita la exportación de empleados seleccionados al backend y retorna el contenido CSV como string.
 *
 * @param {number[]} idsEmpleado - Arreglo de IDs de empleados seleccionados para exportar.
 * @returns {Promise<{ mensaje: string, csv: string }>} Respuesta con mensaje y contenido CSV.
 * @throws {Error} Si la petición falla o el servidor devuelve un mensaje de error.
 * 
 * @see [RF59 - Exportar Empleados](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59)
 */

export const exportarEmpleados = async (idsEmpleado) => {
  try {
    const response = await axios.post(
      RUTAS_API.EMPLEADOS.EXPORTAR_EMPLEADOS,
      { idsEmpleado },
      {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensaje || 'Error al importar empleados en el servidor'
    );
  }
};