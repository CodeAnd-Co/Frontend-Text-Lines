// RF48 - Leer Categoría de Productos
import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Consulta el detalle de una categoría por su ID
 * @param {number} idCategoria
 * @returns {Promise<object>}
 */
export const leerCategoria = async (idCategoria) => {
  try {
    const { data } = await axios.get(
      `${RUTAS_API.CATEGORIAS.LEER}/${idCategoria}`,
      {
        headers: { 'x-api-key': API_KEY },
        withCredentials: true,
      }
    );

    const productos = data.categoria.productos?.map((produc) => produc.nombreComun) || [];

    return {
      idCategoria: data.categoria.idCategoria,
      nombreCategoria: data.categoria.nombreCategoria,
      descripcion: data.categoria.descripcion,
      productos,
    };
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || 'Error al obtener categoría';
    throw new Error(mensaje);
  }
};