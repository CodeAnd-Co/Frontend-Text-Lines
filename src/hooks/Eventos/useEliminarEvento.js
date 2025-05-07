//RF[40] - Elimina evento - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40
import { useState } from 'react';
import { RepositorioEliminarEvento } from '@Repositorios/Eventos/RepositorioEliminarEvento';
/**
 * * Hook para eliminar eventos.
 * * @param {array} idsEvento - ID del evento a eliminar
 * * @return {{
 * *  mensaje: string,
 *  *  cargando: boolean,
 * *  error: string | null,
 * * }}
 */
export function useEliminarEvento() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const eliminar = async (idsEvento) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioEliminarEvento.eliminarEventos(idsEvento);
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
