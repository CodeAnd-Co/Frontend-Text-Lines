//RF[16] Crea Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

import { RUTAS_API } from '@Constantes/rutasAPI';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Crea un nuevo empleado
 * @param {Object} datosEmpleado - Los datos del empleado a crear
 * @returns {Promise} - Promise con la respuesta del servidor
 */
export class RepositorioCrearEmpleado {
  static async crear(cambios) {
    try {
      const respuesta = await axios.post(RUTAS_API.EMPLEADOS.CREAR, cambios, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });
      return respuesta.data;
    } catch (error) {
      throw new Error(error?.response?.data?.mensaje || 'Error al crear empleado');
    }
  }
}
