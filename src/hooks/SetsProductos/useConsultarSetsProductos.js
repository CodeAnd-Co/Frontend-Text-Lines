import { useEffect, useState } from 'react';
import { RepositorioConsultarSetsProductos } from '@Repositorios/SetsProductos/RepositorioConsultarSetsProductos';

/**
 * Hook para consultar la lista de sets de productos desde el repositorio.
 * @returns {{
 *   setsDeProductos: SetProductos[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos
 * @see https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 */

export function useConsultarSetsProductos() {
  const [setsDeProductos, setSetsProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(1);

  useEffect(() => {
    /**
     * Carga la lista de sets de productos llamando al repositorio.
     * Maneja estados de carga, éxito y error.
     */
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { setsDeProductos, mensaje } = await RepositorioConsultarSetsProductos.obtenerLista();
        setSetsProductos(setsDeProductos);
        setMensaje(mensaje);
      } catch (err) {
        setSetsProductos([]);
        setMensaje('');
        setError(err.message || 'Error desconocido');
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [recargarToken]);

  /**
   * Incrementa el token de recarga para volver a disparar la consulta.
   */
  const recargar = () => {
    setRecargarToken((prev) => {
      return prev + 1;
    });
  };

  return { setsDeProductos, mensaje, cargando, error, recargar };
}
