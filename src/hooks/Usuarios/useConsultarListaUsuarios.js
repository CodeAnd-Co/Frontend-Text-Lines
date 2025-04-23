import { useEffect, useState } from 'react';
import { RepositorioConsultarListaUsuarios } from '../../dominio/repositorios/Usuarios/repositorioConsultarListaUsuarios';

/**
 * Hook para consultar la lista de usuarios.
 * @param {Object} opciones - Parámetros como { limit, offset }
 * @returns {{
 *   usuarios: Usuario[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarListaUsuarios({ limit = 10, offset = 0 } = {}) {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const repositorio = new RepositorioConsultarListaUsuarios();

    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { usuarios, mensaje } = await repositorio.obtenerLista({ limit, offset });
        setUsuarios(usuarios);
        setMensaje(mensaje);
      } catch (err) {
        setUsuarios([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [limit, offset, recargarToken]);

  const recargar = () => {
    setRecargarToken((prev) => prev + 1);
  };

  return { usuarios, mensaje, cargando, error, recargar };
}
