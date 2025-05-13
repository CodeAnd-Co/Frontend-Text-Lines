import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const obtenerEmpleados = async (clienteSeleccionado) => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/api/empleados/consultar-lista`,
      { clienteSeleccionado },
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );
    const filasFormateadas = respuesta.data.empleados.map((empleado) => ({
      id: empleado.idEmpleado,
      nombre: empleado.nombreCompleto,
      area: empleado.areaTrabajo,
    }));
    return filasFormateadas;
  } catch {
    return [];
  }
};
export default obtenerEmpleados;
