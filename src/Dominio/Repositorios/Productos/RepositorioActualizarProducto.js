// RF [29] Actualiza Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29]
import axios from 'axios';
import { RUTAS_API } from '@Utilidades/Constantes/rutasAPI';
import ProductoCompleto from '@Modelos/Productos/ProductoCompleto';
import Variante from '@Modelos/Productos/Variante';
const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioActualizarProducto {
  /**
   * Actualiza un producto y sus variantes en el backend.
   * @param {Object} productoRaw - Datos del producto a actualizar.
   * @param {Array} variantesRaw - Lista de variantes del producto.
   * @param {File|null} imagenProducto - Imagen del producto.
   * @param {Object} imagenesVariantes - Mapa de imágenes por variante.
   * @returns {Promise<Object>} Respuesta del servidor.
   */ static async actualizarProducto({
    productoRaw,
    variantesRaw,
    imagenProducto,
    imagenesVariantes,
  }) {
    const form = new FormData();

    console.log('Datos del producto recibidos:', productoRaw);

    // Verificar que tengamos un ID de producto válido
    if (!productoRaw.idProducto) {
      console.error('Error: No se encontró el ID del producto en los datos recibidos');
      throw new Error(
        'El ID del producto es requerido para actualizar. Por favor, asegúrate de seleccionar un producto válido.'
      );
    }

    // Asegurarnos de que el ID del producto sea un string
    form.append('idProducto', String(productoRaw.idProducto)); // Limpiar el objeto producto antes de enviarlo
    const productoLimpio = {
      idProducto: productoRaw.idProducto, // Asegurarnos de incluir el idProducto
      nombreComun: productoRaw.nombreComun,
      nombreComercial: productoRaw.nombreComercial,
      descripcion: productoRaw.descripcion,
      marca: productoRaw.marca,
      modelo: productoRaw.modelo,
      tipoProducto: productoRaw.tipoProducto,
      precioPuntos: Number(productoRaw.precioPuntos),
      precioCliente: Number(productoRaw.precioCliente),
      precioVenta: Number(productoRaw.precioVenta),
      costo: Number(productoRaw.costo),
      impuesto: Number(productoRaw.impuesto),
      descuento: Number(productoRaw.descuento),
      estado: Number(productoRaw.estado),
      envio: Number(productoRaw.envio),
      idProveedor: productoRaw.idProveedor, // Agregar también el idProveedor
    };

    // Agregar el producto como JSON string
    form.append('producto', JSON.stringify(productoLimpio));

    // Limpiar y formatear las variantes
    const variantesLimpias = variantesRaw.map((variante) => ({
      identificador: String(variante.identificador),
      nombreVariante: variante.nombreVariante,
      descripcion: variante.descripcion,
      opciones: Array.isArray(variante.opciones)
        ? variante.opciones.map((opcion) => ({
            valorOpcion: opcion.valorOpcion,
            cantidad: Number(opcion.cantidad),
            SKUautomatico: opcion.SKUautomatico,
            SKUcomercial: opcion.SKUcomercial,
            costoAdicional: Number(opcion.costoAdicional || 0),
            descuento: Number(opcion.descuento || 0),
            estado: Number(opcion.estado || 1),
          }))
        : [],
    }));

    // Agregar las variantes como JSON string
    form.append('variantes', JSON.stringify(variantesLimpias));

    // Agregar imagen del producto si existe
    if (imagenProducto instanceof File) {
      form.append('imagenProducto', imagenProducto);
    } // Agregar imágenes de variantes y construir el mapa
    const mapaImagenes = [];
    if (imagenesVariantes && typeof imagenesVariantes === 'object') {
      for (const [idVariante, imagenesArray] of Object.entries(imagenesVariantes)) {
        if (Array.isArray(imagenesArray)) {
          for (const img of imagenesArray) {
            if (img && img.file instanceof File) {
              form.append('imagenesVariante', img.file);
              mapaImagenes.push({
                filename: img.file.name,
                idVariante: String(idVariante),
              });
            }
          }
        }
      }
    }

    // Agregar el mapa de imágenes como JSON string
    form.append('mapaImagenes', JSON.stringify(mapaImagenes)); // Log para depuración
    console.log('Datos del formulario:', Array.from(form.entries()));
    try {
      // Log de los datos que se están enviando
      console.log('Enviando datos al servidor:', {
        url: RUTAS_API.PRODUCTOS.ACTUALIZAR_PRODUCTO,
        formData: {
          idProducto: form.get('idProducto'),
          producto: JSON.parse(form.get('producto')),
          variantes: JSON.parse(form.get('variantes')),
          mapaImagenes: JSON.parse(form.get('mapaImagenes')),
          tieneImagenProducto: !!form.get('imagenProducto'),
          cantidadImagenesVariante: form.getAll('imagenesVariante').length,
        },
      }); // Log de cada campo del FormData individualmente
      console.log('=== DATOS ENVIADOS ===');
      for (let [key, value] of form.entries()) {
        if (key === 'producto' || key === 'variantes' || key === 'mapaImagenes') {
          console.log(`${key}:`, JSON.parse(value));
        } else if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      const respuesta = await axios.post(RUTAS_API.PRODUCTOS.ACTUALIZAR_PRODUCTO, form, {
        withCredentials: true,
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        transformRequest: [(data) => data], // Prevenir que axios transforme el FormData
      });

      return respuesta.data;
    } catch (error) {
      // Log detallado del error
      console.error('Error detallado:', {
        mensaje: error?.response?.data?.mensaje,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        headers: error?.response?.headers,
      });

      // Log de la request que causó el error
      console.error('Request data:', {
        url: error?.config?.url,
        method: error?.config?.method,
        headers: error?.config?.headers,
        data: error?.config?.data,
      });

      const mensaje = error?.response?.data?.mensaje || 'Error al actualizar el producto';
      throw new Error(mensaje);
    }
  }
}
