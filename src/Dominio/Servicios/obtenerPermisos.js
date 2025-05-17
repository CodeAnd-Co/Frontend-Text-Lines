import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const obtenerPermisos = async () => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/api/roles/obtener-opciones`,
      {},
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );

    const permisosFormateados = respuesta.data.resultado.map((permiso) => ({
      id: permiso.id,
      nombre: permiso.nombre,
    }));

    return permisosFormateados;
  } catch {
    return [];
  }
};

export default obtenerPermisos;
