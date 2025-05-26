// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import { useState } from 'react';
import { RepositorioCrearEvento } from '@Dominio/Repositorios/Eventos/RepositorioCrearEvento';
import { Evento } from '@Dominio/Modelos/Eventos/Eventos';

/**
 * Hook para crear eventos.
 * @return {{
 *  crear: function,
 *  mensaje: string,
 *  cargando: boolean,
 *  error: string | null,
 *  resetError: function,
 * }}
 */
export function useCrearEvento() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Resetea el estado de error
   */
  const resetError = () => setError(null);

  /**
   * Crea un nuevo evento.
   *
   * @param {Evento} evento - Objeto evento a crear.
   * @returns {Promise<boolean>} - true si se creó correctamente, false si ocurrió un error
   */
  const crear = async (evento) => {
    setCargando(true);
    setError(null);

    try {
      const { mensaje } = await RepositorioCrearEvento.crearEvento(evento);
      setMensaje(mensaje);
      return true; // Indica éxito
    } catch (err) {
      setMensaje('');
      setError(err.message);
      throw err; // Propaga el error para que el componente pueda manejarlo
    } finally {
      setCargando(false);
    }
  };

  return { crear, mensaje, cargando, error, resetError };
}