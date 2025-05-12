import { useEffect, useState } from 'react';
import { RepositorioLeerGrupoEmpleados } from '@Repositorios/Empleados/RepositorioLeerGrupoEmpleados';

/**
 * * Hook para obtener los datos de un grupo de empleados por su ID
 * @param {number} idGrupo - ID del grupo de empleados a consultar
 * @returns {{
 *    grupoEmpleados: GrupoEmpleadosLectura | null,
 *    mensaje: string,
 *    cargando: boolean,
 *    error: string | null
 *  }}
 *  @see [RF[23] Leer grupo de empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23)
 */

export const useGrupoEmpleadosId = (idGrupo) => {
  const [grupoEmpleados, setGrupoEmpleados] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerGrupoEmpleados = async () => {
      setCargando(true);
      setError(null);

      try {
        const { grupoEmpleados, mensaje } = await RepositorioLeerGrupoEmpleados.obtenerPorId(
          idGrupo
        );

        setGrupoEmpleados(grupoEmpleados);
        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (idGrupo) {
      obtenerGrupoEmpleados();
    }
  }, [idGrupo]);

  return { grupoEmpleados, mensaje, cargando, error };
};
