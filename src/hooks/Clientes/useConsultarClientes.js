import { useEffect, useState } from 'react';
import { RepositorioListaClientes } from '@Repositorios/Clientes/repositorioListaClientes';

/**
 * Hook para consultar la lista de clientes.
 * @returns {{
 *   clientes: Cliente[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarClientes() {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { clientes, mensaje } = await RepositorioListaClientes.obtenerLista();
        setClientes(clientes);
        setMensaje(mensaje);
      } catch (err) {
        setClientes([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  return { clientes, mensaje, cargando, error };
}
