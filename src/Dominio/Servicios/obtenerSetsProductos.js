import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const obtenerSetsProductos = async (clienteSeleccionado) => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/api/sets-productos/consultar-lista`,
      { clienteSeleccionado },
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );

    const filasFormateadas = respuesta.data.setsProductos.map((producto) => ({
      id: producto.idSetProducto,
      nombreProducto: producto.nombre,
      activo: producto.activo,
    }));

    return filasFormateadas;
  } catch {
    return [];
  }
};

export default obtenerSetsProductos;
