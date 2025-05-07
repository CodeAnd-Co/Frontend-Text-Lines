import axios from 'axios';
import { RUTAS_API } from '@Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export class RepositorioEliminarSetCuotas {
    static async eliminarSetCuotas(idsSetCuotas) {
        try{
            const respuesta = await axios.post(
                RUTAS_API.CUOTAS.ELIMINAR_SET_CUOTAS,
                { idsSetCuotas },
                {
                    headers: { 'x-api-key': API_KEY },
                    withCredentials: true,
                }
            );
            return respuesta.data;
        }catch (error){
            const mensaje = error.response?.data?.mensaje || 'Error al eliminar el set de cuotas.';
            throw new Error(mensaje);
        }
    }
}
