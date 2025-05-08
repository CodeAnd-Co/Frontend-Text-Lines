import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';
import { ListaTipoPago } from '@Modelos/Pagos/ListaTipoPago';

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioConsultarTipoPagos {
  static async consultarPagos() {
    try {
      const respuesta = await axios.get(RUTAS_API.PAGOS.CONSULTAR_LISTA, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
        },
      });
      return new ListaTipoPago(respuesta.data);
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje;
      throw new Error(mensaje);
    }
  }
}
