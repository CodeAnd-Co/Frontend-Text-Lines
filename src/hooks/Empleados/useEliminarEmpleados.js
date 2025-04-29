import { useEffect, useState } from 'react';
import { RepositorioEliminarEmpleados } from '../../dominio/repositorios/Empleados/RepositorioEliminarEmpleados';

/**
 * Hook para eliminar empleados.
 * @param {array} idsEmpleado
 * @returns {{
 *  mensaje: string,
 *  cargando: boolean,
 *  error: string | null
 * }}
 */
export function useEliminarEmpleados(idsEmpleado) {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eliminar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { mensaje } = await RepositorioEliminarEmpleados.eliminarEmpleado(idsEmpleado);
        setMensaje(mensaje);
      } catch (err) {
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (Array.isArray(idsEmpleado) && idsEmpleado.length > 0) {
      eliminar();
    }
  }, [idsEmpleado]);

  return { mensaje, cargando, error };
} 