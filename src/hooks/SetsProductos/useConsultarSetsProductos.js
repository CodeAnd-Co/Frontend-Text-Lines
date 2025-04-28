import { useEffect, useState } from 'react';
import { RepositorioConsultarSetsProductos } from '../../dominio/repositorios/SetsProductos/RepositorioConsultarSetsProductos';

/**
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos
 * @see https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 *
 * Hook para consultar la lista de sets de productos desde el repositorio.
 * Maneja el estado de carga, error, datos y permite recargar la información.
 *
 * @returns {Object} Retorna un objeto con:
 * - setsDeProductos {Array}: Lista de sets de productos obtenidos.
 * - mensaje {string}: Mensaje relacionado con la operación.
 * - cargando {boolean}: Indica si la consulta está en proceso.
 * - error {string|null}: Error ocurrido durante la consulta, si existe.
 * - recargar {Function}: Función para volver a cargar la lista manualmente.
 */
export function useConsultarSetsProductos() {
  const [setsDeProductos, setSetsProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

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
        console.log('try', setsDeProductos, mensaje);

        setSetsProductos(setsDeProductos);
        setMensaje(mensaje);
      } catch (err) {
        setSetsProductos([]);
        setMensaje('');
        console.log('Error productos: ', error);
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
    setRecargarToken((prev) => prev + 1);
  };

  return { setsDeProductos, mensaje, cargando, error, recargar };
}
