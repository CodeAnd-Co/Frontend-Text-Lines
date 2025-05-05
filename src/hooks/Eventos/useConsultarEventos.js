import { useEffect, useState } from 'react';
import { RepositorioConsultarEventos } from '@dominio/repositorios/Eventos/RepositorioConsultarEventos';

/**
 * Hook para consultar la lista de eventos.
 * @returns {{
 *   eventos: Evento[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarEventos() {
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);

    try {
      const listaEventos = await RepositorioConsultarEventos.consultarLista();

      setEventos(listaEventos.eventos);
      setMensaje(listaEventos.mensaje || 'Eventos cargados correctamente');
    } catch (err) {
      setEventos([]);
      setMensaje('');
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { eventos, mensaje, cargando, error, recargar: cargar };
}
