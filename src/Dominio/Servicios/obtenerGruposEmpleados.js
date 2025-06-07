import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Servicio para consultar la lista de grupos de empleados.
 * Basado en RF22: Consulta Lista de Grupo Empleados
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
 */
const obtenerGruposEmpleados = async (clienteSeleccionado) => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/api/empleados/consultar-grupos`,
      { clienteSeleccionado },
      {
        headers: {
          'x-api-key': API_KEY,
        },
        withCredentials: true,
      }
    );

    const gruposFormateados = respuesta.data.grupos.map((grupo) => ({
      id: grupo.idGrupo,
      nombre: grupo.geNombre,
      descripcion: grupo.descripcion,
      totalEmpleados: grupo.totalEmpleados,
    }));

    return gruposFormateados;
  } catch (error) {
    console.error('Error al obtener grupos de empleados:', error);
    return [];
  }
};

export default obtenerGruposEmpleados;
