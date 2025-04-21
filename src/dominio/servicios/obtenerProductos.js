import axios from 'axios';

const obtenerProductos = async (API_URL, API_KEY) => {
  try {
    const respuesta = await axios.get(`${API_URL}/api/cuotas/obtener-opciones`, {
      params: { idCliente: 102 },
      headers: {
        'x-api-key': API_KEY,
      },
    });

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
