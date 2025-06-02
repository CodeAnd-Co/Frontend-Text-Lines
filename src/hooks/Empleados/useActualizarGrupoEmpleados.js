import { useState } from 'react';
import { RepositorioActualizarGrupoEmpleados } from '@Repositorios/Empleados/RepositorioActualizarGrupoEmpleados';

/**
 * Hook para actualizar los datos de un grupo de empleados
 * @returns {Object} Objeto con la función de actualización y estados
 */
export const useActualizarGrupoEmpleados = () => {
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const actualizarGrupo = async (idGrupo, nombre, descripcion, empleados, setsDeProductos) => {
    if (!idGrupo) return;
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      const resultado = await RepositorioActualizarGrupoEmpleados.actualizarGrupoEmpleados(
        idGrupo,
        nombre,
        descripcion,
        empleados,
        setsDeProductos
      );

      // Consideramos la actualización exitosa si tenemos una respuesta del servidor
      setExito(true);
      setMensaje(resultado?.data?.mensaje || 'Grupo actualizado exitosamente');
      return resultado;
    } catch (err) {
      setExito(false);
      setError(true);
      const errorMessage =
        err?.response?.data?.mensaje ||
        err?.response?.data?.error ||
        err?.message ||
        'Ocurrió un error al actualizar el grupo de empleados';

      setMensaje(errorMessage);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const resetEstado = () => {
    setExito(false);
    setError(false);
    setMensaje('');
  };

  return {
    actualizarGrupo,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
  };
};

export default useActualizarGrupoEmpleados;
