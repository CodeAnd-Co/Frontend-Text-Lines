import { useState } from 'react';
import { RepositorioActualizarGrupoEmpleados } from '@Repositorios/Empleados/RepositorioActualizarGrupoEmpleados';

/**
 * Hook para actualizar los datos de un grupo de empleados
 * @returns {Object} Objeto con la función de actualización y estados
 */
export const useActualizarGrupoEmpleados = () => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const actualizarGrupo = async (idGrupo, nombre, descripcion, empleados, setsDeProductos) => {
    if (!idGrupo) return;

    setCargando(true);
    setError(null);

    try {
      console.log('useActualizarGrupoEmpleados:', {
        idGrupo,
        nombre,
        descripcion,
        empleados,
        setsDeProductos,
      });

      const { mensaje } = await RepositorioActualizarGrupoEmpleados.actualizarGrupoEmpleados(
        idGrupo,
        nombre,
        descripcion,
        empleados,
        setsDeProductos
      );

      setMensaje(mensaje);
      return mensaje;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  return { actualizarGrupo, mensaje, cargando, error };
};
