import { useEffect, useState } from 'react';
import { RepositorioListaCuotas } from '../../Dominio/repositorios/Cuotas/repositorioListaCuotas';

/**
 * Hook para consultar la lista de cuotas.
 * @returns {{
 *   cuotas: Cuota[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarCuotas() {
  const [cuotas, setCuotas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { cuotas, mensaje } = await RepositorioListaCuotas.obtenerLista();
        setCuotas(cuotas);
        setMensaje(mensaje);
      } catch (err) {
        setCuotas([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  return { cuotas, mensaje, cargando, error };
}
