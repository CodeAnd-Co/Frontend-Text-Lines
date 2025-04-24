import { useEffect, useState } from 'react';
import { RepositorioListaRoles } from '../../dominio/repositorios/Roles/repositorioListaRoles';

/**
 * Hook para consultar la lista de roles.
 * @returns {{ roles: Rol[], cargando: boolean, error: string | null, mensaje: string, recargar: () => void }}
 */
export function useConsultarRoles() {
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const repositorio = RepositorioListaRoles;

    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { roles, mensaje } = await repositorio.obtenerLista();
        setRoles(roles);
        setMensaje(mensaje);
        console.log('Datos recibidos:', roles);
      } catch (err) {
        setRoles([]);
        setMensaje('');
        setError(err.message);
        console.log('Error recibido:', err.message);
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