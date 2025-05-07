import { useEffect, useState } from 'react';
import { RepositorioEliminarSetCuotas } from '@Repositorios/Cuotas/repositorioEliminarSetCuotas';

export function useEliminarSetCuotas(idsSetCuotas){
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const eliminarSetCuotas = async () => {
            setCargando(true);
            setError(null);

            try{
                const {mensaje} = await RepositorioEliminarSetCuotas.eliminarSetCuotas(idsSetCuotas);
                setMensaje(mensaje);
            } catch(err) {
                setMensaje('');
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        if (Array.isArray(idsSetCuotas) && idsSetCuotas.length > 0) {
            eliminarSetCuotas();
        }
    }, [idsSetCuotas]);

    return {mensaje, cargando, error};
}