import { useState } from 'react';
import { exportarEmpleados as repoExportarEmpleados } from '@Repositorios/Empleados/RepositorioExportarEmpleados';

/**
 * Hook para gestionar la exportación de empleados en formato CSV.
 *
 * @returns {{
 *   exportar: (idsEmpleado: number[]) => Promise<void>,
 *   cargando: boolean,
 *   error: string | null,
 *   csv: string,
 *   mensaje: string
 * }}
 * @see [RF59 - Exportar Empleados](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59)
 */
const useExportarEmpleados = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [csv, setCsv] = useState('');
  const [mensaje, setMensaje] = useState('');

  const exportar = async (idsEmpleado) => {
    setCargando(true);
    setError(null);
    setCsv('');
    setMensaje('');

    try {
      const { mensaje, csv } = await repoExportarEmpleados(idsEmpleado);
      setMensaje(mensaje);
      setCsv(csv);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { exportar, cargando, error, csv, mensaje };
};

export default useExportarEmpleados;