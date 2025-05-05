//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import { useEffect, useState } from 'react';
import { RepositorioListaRol } from '../../Dominio/Repositorios/Roles/RepositorioListaRol';

/**
 * Hook para consultar la lista de roles.
 * @param void
 * @returns {{
 *   roles: Rol[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarRoles() {
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { roles, mensaje } = await RepositorioListaRol.obtenerLista();
        setRoles(roles);
        setMensaje(mensaje);
      } catch (err) {
        setRoles([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [recargarToken]);
  const recargar = () => {
    setRecargarToken((prev) => prev + 1);
  };

  return { roles, mensaje, cargando, error, recargar };
}
