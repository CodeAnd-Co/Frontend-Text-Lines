import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearCliente {
  static crearCliente(formData) {
    return axios.post(RUTAS_API.CLIENTES.CREAR_CLIENTE, formData, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  }
}
