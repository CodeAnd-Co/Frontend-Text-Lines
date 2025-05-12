import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';
import { LeerCuota } from '@Modelos/Cuotas/LeerCuota';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioLeerCuota {
  /**
   * Consulta los datos de una cuota específica por ID
   * @param {number} idCuota - ID de la cuota a consultar
   * @returns {Promise<{cuota: LeerCuota, mensaje: string}>}
   *
   * @see [RF[38] Leer cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38)]
   */
  static async obtenerPorId(idCuota) {
    try {
      const respuesta = await axios.post(
        RUTAS_API.CUOTAS.CONSULTAR_CUOTA,
        { idCuota },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      const { cuota, mensaje } = respuesta.data;

      const cuotaInstancia = new LeerCuota(cuota);

      return {
        cuota: cuotaInstancia,
        mensaje,
      };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al obtener datos de la cuota.';
      throw new Error(mensaje);
    }
  }
}
