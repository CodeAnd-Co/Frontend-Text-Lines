//RF[8] Leer Rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8

import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarRol {
  static async actualizar(idRol, datosRol) {
    try {
      const datosRolActualizacion = {datosRol, idRol}
      const respuesta = await axios.put(
        `${RUTAS_API.ROLES.ACTUALIZAR}`,
        { datosRolActualizacion },
        {
          withCredentials: true,
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar el rol';
      throw new Error(mensaje);
    }
  }
}