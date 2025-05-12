import { useEffect, useState } from 'react';
import { RepositorioLeerCuota } from '@Repositorios/Cuotas/repositorioLeerCuota';

/**
 * Hook para obtener los datos de una cuota por su ID
 * @param {number} idCuota - ID de la cuota a consultar
 * @returns {{
 * cuota: CuotaLectura | null,
 * mensaje: string,
 * cargando: boolean,
 * error: string | null
 * }}
 *
 * @see [RF[33] Leer cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33]
 * */

export const useCuotaId = (idCuota) => {
  const [cuota, setCuota] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCuota = async () => {
      setCargando(true);
      setError(null);

      try {
        const { cuota, mensaje } = await RepositorioLeerCuota.obtenerPorId(idCuota);

        setCuota(cuota);
        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (idCuota) {
      obtenerCuota();
    }
  }, [idCuota]);

  return { cuota, mensaje, cargando, error };
};
