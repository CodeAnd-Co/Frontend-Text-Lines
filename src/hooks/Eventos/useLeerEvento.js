import { useEffect, useState } from 'react';
import { RepositorioLeerEvento } from '@Repositorios/Eventos/repositorioLeerEvento';

/**
 * Hook para obtener los datos de un evento por su ID
 * @param {number} idEvento - ID del evento a consultar
 * @returns {{
 *  evento: EventoLectura | null,
 *  mensaje: string,
 * cargando: boolean,
 * error: string | null
 * }}
 *
 * @see [RF[38] Leer evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38]
 */

export const useEventoId = (idEvento) => {
  const [evento, setEvento] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEvento = async () => {
      setCargando(true);
      setError(null);

      try {
        const { evento, mensaje } = await RepositorioLeerEvento.obtenerPorId(idEvento);

        setEvento(evento);
        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (idEvento) {
      obtenerEvento();
    }
  }, [idEvento]);

  return { evento, mensaje, cargando, error };
};
