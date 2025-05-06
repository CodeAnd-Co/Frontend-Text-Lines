// RF[20] - Elimina empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
import { useState } from 'react';
import { RepositorioEliminarEmpleado } from '@Repositorios/Empleados/RepositorioEliminarEmpleado';
/**
 * * Hook para eliminar empleados.
 * * @param {array} idsEmpleado - ID del empleado a eliminar
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */
export function useEliminarEmpleado() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsEmpleado) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarEmpleado.eliminarEmpleados(idsEmpleado);
      setMensaje(mensaje);
    } catch (err) {
      setMensaje('');
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { eliminar, mensaje, cargando, error };
}
