// src/hooks/useImportarEmpleados.js
import { useState } from 'react';
import { importarEmpleados as repoImportarEmpleados } from '@Repositorios/Empleados/RepositorioImportarEmpleados';

/**
 * Hook para importar un array de empleados:
 * - Normaliza cada fila (tipos, fechas, acentos)
 * - Envía al backend vía repositorio
 * - Maneja estados de carga, éxito y errores parciales
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

  // Transforma una fila cruda del CSV a tipos correctos
  const transformRow = (row) => ({
    nombreCompleto: row.nombreCompleto?.trim().normalize('NFC'),
    correoElectronico: row.correoElectronico?.trim(),
    contrasena: row.contrasena,
    numeroTelefono: row.numeroTelefono?.trim(),
    direccion: row.direccion?.trim().normalize('NFC'),
    fechaNacimiento: formatDate(row.fechaNacimiento),
    genero: row.genero?.trim(),
    estatus: row.estatus === '1' || row.estatus?.toLowerCase() === 'true',
    idRol: Number(row.idRol),
    idCliente: Number(row.idCliente),
    numeroEmergencia: row.numeroEmergencia?.trim(),
    areaTrabajo: row.areaTrabajo?.trim().normalize('NFC'),
    posicion: row.posicion?.trim().normalize('NFC'),
    cantidadPuntos: parseFloat(row.cantidadPuntos),
    antiguedad: formatDate(row.antiguedad),
  });

  /**
   * Toma el JSON “crudo” del CSV, lo transforma y lo envía al backend.
   * @param {object[]} empleadosRaw - Array de objetos tal cual viene de Papa.parse
   */
  const importar = async (empleadosRaw) => {
    // 1) Transformar filas
    const empleados = empleadosRaw.map(transformRow);
    console.log('▶ Filas transformadas a enviar:', empleados);

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

  return { importar, cargando, errores, exito };
};

export default useImportarEmpleados;
