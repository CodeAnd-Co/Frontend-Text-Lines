//RF25 Eliminar Grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25

import { useState } from 'react';
import { RepositorioEliminarGrupoEmpleados } from '@Repositorios/Empleados/RepositorioEliminarGrupoEmpleados'
/**
 * * Hook para eliminar un Grupo de empleados.
 * * @param {array} idGrupo
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */
export function useEliminarGrupoEmpleados() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsGrupo) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarGrupoEmpleados.eliminarGrupoEmpleados(idsGrupo);
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
