import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const obtenerProductos = async (clienteSeleccionado) => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/api/cuotas/obtener-opciones`,
      { clienteSeleccionado },
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );

    const filasFormateadas = respuesta.data.resultado.map((producto) => ({
      id: producto.id,
      nombreProducto: producto.nombreProducto,
      tipo: producto.tipo,
    }));

    return filasFormateadas;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export default obtenerProductos;
