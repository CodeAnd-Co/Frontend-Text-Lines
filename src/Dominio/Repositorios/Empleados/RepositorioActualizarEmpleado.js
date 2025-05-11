//RF[19] Actualiza Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarEmpleado {
  static async actualizar(cambios) {
    try {
      const respuesta = await axios.put(
        RUTAS_API.EMPLEADOS.ACTUALIZAR_EMPLEADO,
        { cambios },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar';
      throw new Error(mensaje);
    }
  }
}
