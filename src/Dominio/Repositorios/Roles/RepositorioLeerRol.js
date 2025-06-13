import axios from 'axios';
import { modeloDetalleRol } from '@Modelos/Roles/DetalleRol';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioLeerRol {
  static async obtenerDetalle(idRol) {
    try {
      const { data } = await axios.get(`${RUTAS_API.ROLES.LEER_ROL}?idRol=${idRol}`, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });

      return modeloDetalleRol(data);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al consultar detalle del rol';
      throw new Error(mensaje);
    }
  }
}