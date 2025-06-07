import { useState, useCallback } from 'react';
import { RepositorioLeerRol } from '@Repositorios/Roles/RepositorioLeerRol';

/**
 * Hook para leer el detalle de un rol.
 */
export function useLeerRol() {
  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const leerRol = useCallback(async (idRol) => {
    setCargando(true);
    setError(null);

    try {
      const detalleRol = await RepositorioLeerRol.obtenerDetalle(idRol);
      setDetalle(detalleRol);
    } catch (err) {
      setError(err.message || 'Error al leer el rol');
    } finally {
      setCargando(false);
    }
  }, []);

  return { detalle, cargando, error, leerRol };
}