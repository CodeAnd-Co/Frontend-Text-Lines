import { useState, useEffect } from 'react';
import { importarEmpleados as repoImportarEmpleados } from '@Repositorios/Empleados/RepositorioImportarEmpleados';

/**
 * Hook para gestionar la importación masiva de empleados desde un CSV.
 *
 * - Normaliza cada fila (tipos, fechas, normalización Unicode).
 * - Envia datos al backend mediante el repositorio correspondiente.
 * - Maneja estados de carga, errores parciales y éxito.
 *
 * @see [RF[23]] Importar empleados - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF57])
 * @returns {Object} Estado y función de importación.
 * @returns {function(Array<Object>): Promise<void>} return.importar - Función que recibe el array crudo de filas
 *   del CSV y lanza la importación.
 * @returns {boolean} return.cargando - Indicador de estado de carga.
 * @returns {Array<{fila: number|string, error: string}>} return.errores - Lista de errores parciales
 *   con número de fila y mensaje.
 * @returns {boolean} return.exito - Pulso de éxito (true tras importación completa, se resetea automáticamente).
 */
const useImportarEmpleados = () => {
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState([]);
  const [exito, setExito] = useState(false);

  // Convierte "D/M/YYYY" o "DD/MM/YYYY" a "YYYY-MM-DD"
  const formatDate = (str) => {
    if (typeof str !== 'string') return str;
    const parts = str.split('/');
    if (parts.length === 3) {
      const [dia, mes, anio] = parts.map((param) => param.padStart(2, '0'));
      return `${anio}-${mes}-${dia}`;
    }
    return str;
  };

  // Transformar una fila cruda del CSV a tipos correctos
  const transformRow = (row) => ({
    nombreCompleto: row.nombreCompleto?.trim().normalize('NFC'),
    correoElectronico: row.correoElectronico?.trim(),
    contrasena: row.contrasena,
    numeroTelefono: row.numeroTelefono?.trim(),
    direccion: row.direccion?.trim().normalize('NFC'),
    fechaNacimiento: formatDate(row.fechaNacimiento),
    genero: row.genero?.trim(),
    estatus: (() => {
    const raw = row.estatus?.toString().trim().toLowerCase();
    if (raw === '1'  || raw === 'true')  return true;
    if (raw === '0'  || raw === 'false') return false;
    return null; 
    })(),
    numeroEmergencia: row.numeroEmergencia?.trim(),
    areaTrabajo: row.areaTrabajo?.trim().normalize('NFC'),
    posicion: row.posicion?.trim().normalize('NFC'),
    cantidadPuntos: parseFloat(row.cantidadPuntos),
    antiguedad: formatDate(row.antiguedad),
  });

  const importar = async (empleadosRaw) => {
    
    const empleados = empleadosRaw.map(transformRow);

    setCargando(true);
    setErrores([]);
    setExito(false);

    try {
      const data = await repoImportarEmpleados(empleados);

      if (data.errores) {
        setErrores(data.errores);
      } else {
        setExito(true);
      }
    } catch (err) {
      setErrores([{ fila: '-', error: err.message }]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(false), 0);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  return { importar, cargando, errores, exito };
};

export default useImportarEmpleados;
