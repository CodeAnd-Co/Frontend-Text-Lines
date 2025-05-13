import { useEffect, useState } from 'react';
import { RepositorioActualizarGrupoEmpleados } from '@Repositorios/Empleados/RepositorioActualizarGrupoEmpleados';

/**
 * * Hook para actualizar los datos de un grupo de empleados
 * @param {number} idGrupo - ID del grupo de empleados a actualizar
 * @param {string} nombre - Nuevo nombre del grupo de empleados
 * @param {string} descripcion - Nueva descripción del grupo de empleados
 * @param {array} empleados - Lista de IDs de empleados a agregar al grupo
 * @param {array} setsDeProductos - Lista de IDs de sets de productos a agregar al grupo
 * @returns {{
 *    mensaje: string,
 * *    cargando: boolean,
 * *    error: string | null
 * *  }}
 * * @see [RF[24] Actualizar grupo de empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24)
 */

export const useActualizarGrupoEmpleados = (
  idGrupo,
  nombre,
  descripcion,
  empleados,
  setsDeProductos
) => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const actualizarGrupoEmpleados = async () => {
      setCargando(true);
      setError(null);

      try {
        const { mensaje } = await RepositorioActualizarGrupoEmpleados.actualizarGrupoEmpleados(
          idGrupo,
          nombre,
          descripcion,
          empleados,
          setsDeProductos
        );

        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (idGrupo) {
      actualizarGrupoEmpleados();
    }
  }, [idGrupo, nombre, descripcion, empleados, setsDeProductos]);

  return { mensaje, cargando, error };
};
