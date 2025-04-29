//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import { useEffect, useState } from 'react';
import { RepositorioConsultarGrupos } from '../../Dominio/repositorios/Empleados/RepositorioConsultarGrupos';
import { useAuth } from '../../hooks/AuthProvider';
import { PERMISOS } from '../../Utilidades/Constantes/permisos';

/**
 * Hook para consultar la lista de grupos de empleados.
 * @param void
 * @returns {{
 *   grupos: GrupoEmpleados[],
 *   mensaje: string,
 *   cargando: boolean,
 *   error: string | null
 * }}
 */

export function useConsultarGrupos() {
  const [grupos, setGrupos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      if (!usuario?.permisos?.includes(PERMISOS.CONSULTAR_GRUPOS_EMPLEADOS)) {
        setCargando(false);
        return;
      }

      try {
        const { grupoEmpleados, mensaje } = await RepositorioConsultarGrupos.consultarGrupos();
        setGrupos(grupoEmpleados);
        setMensaje(mensaje);
      } catch (err) {
        setGrupos([]);
        setMensaje('');
        setError(err.message || 'Ocurrió un error al consultar los grupos');
      } finally {
        setCargando(false);
      }
    };

    if (usuario) cargar();
  }, [usuario]);

  return { grupos, mensaje, cargando, error };
}
