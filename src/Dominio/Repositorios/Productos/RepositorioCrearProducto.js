import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import ProductoCompleto from '@Modelos/Productos/ProductoCompleto';
import Variante from '@Modelos/Productos/Variante';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioCrearProducto {
  /**
   * Recibe los datos crudos del producto y variantes, los convierte a objetos y envía al backend.
   * @param {Object} productoRaw - Objeto con los datos del producto
   * @param {Array} variantesRaw - Array con las variantes y sus opciones
   * @param {File|null} imagenProducto
   * @param {Object} imagenesVariantes - { [idVariante]: File[] }
   * @returns {Promise}
   */
  static async crearProducto({ productoRaw, variantesRaw, imagenProducto, imagenesVariantes }) {
    const producto = new ProductoCompleto(productoRaw);
    const listaVariantes = variantesRaw.map((variantes) => new Variante(variantes));

    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    formData.append('variantes', JSON.stringify(listaVariantes));

    if (imagenProducto) {
      formData.append('imagenProducto', imagenProducto);
    }

    const mapaImagenes = [];

    Object.entries(imagenesVariantes).forEach(([idVariante, imagenesArray]) => {
      imagenesArray.forEach((img) => {
        formData.append('imagenesVariante', img.file);
        mapaImagenes.push({
          filename: img.file.name,
          idVariante,
        });
      });
    });

    formData.append('mapaImagenes', JSON.stringify(mapaImagenes));

    try {
      const respuesta = await axios.post(RUTAS_API.PRODUCTOS.CREAR, formData, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });

      return respuesta.data;
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || 'Error al crear el producto';
      throw new Error(mensaje);
    }
  }
}
