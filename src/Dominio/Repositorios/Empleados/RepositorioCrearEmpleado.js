//RF[16] Crea Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16]

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearEmpleado {
  static async crear(datos) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.EMPLEADOS.CREAR_EMPLEADO,
        { datos },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al crear';
      throw new Error(mensaje);
    }
  }
}
