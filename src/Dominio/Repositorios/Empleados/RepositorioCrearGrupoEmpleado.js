import anxios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const crearGrupoEmpleados = async (datos) => {
    try {
        const response = await anxios.post(`${API_URL}/api/empleados/crear-grupo`, datos, {
            withCredentials: true,
            headers: { 'x-api-key': API_KEY },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || 'Error al crear grupo de empleados en el servidor');   

    }
};