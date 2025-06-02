//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import { Proveedor } from '@Modelos/Proveedores/Proveedor';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearProveedor {
  /**
   * Envía los datos del proveedor al backend para crear un nuevo registro.
   * @param {Object} datos - Datos ya validados y listos para enviar
   * @returns {Promise} respuesta del servidor
   */
  static async crearProveedor(datosProveedor) {
    const proveedor = new Proveedor(datosProveedor);
    try {
      const respuesta = await axios.post(RUTAS_API.PROVEEDORES.CREAR, proveedor, {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
      });
      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al crear el proveedor';
      throw new Error(mensaje);
    }
  }
}
