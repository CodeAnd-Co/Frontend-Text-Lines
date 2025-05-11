import { useState } from 'react';
import { RepositorioActualizarEmpleado } from '@Repositorios/Empleados/RepositorioActualizarEmpleado';
import { RepositorioCrearEmpleado } from '@Repositorios/Empleados/RepositorioCrearEmpleado';

export const useAccionesEmpleado = () => {
  const [errores, setErrores] = useState({});
  // Añadir esta línea para definir la variable cargando
  const [cargando, setCargando] = useState(false);

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  const validarDatos = (datos) => {
    const nuevosErrores = {};

    if (!datos.idEmpleado) nuevosErrores.idEmpleado = CAMPO_OBLIGATORIO;
    if (!datos.idUsuario) nuevosErrores.idUsuario = CAMPO_OBLIGATORIO;
    if (!datos.numeroEmergencia) nuevosErrores.numeroEmergencia = CAMPO_OBLIGATORIO;
    if (!datos.areaTrabajo) nuevosErrores.areaTrabajo = CAMPO_OBLIGATORIO;
    if (!datos.posicion) nuevosErrores.posicion = CAMPO_OBLIGATORIO;
    if (!datos.cantidadPuntos) nuevosErrores.cantidadPuntos = CAMPO_OBLIGATORIO;
    if (!datos.antiguedad) nuevosErrores.antiguedad = CAMPO_OBLIGATORIO;

    return nuevosErrores;
  };

  const handleGuardar = async (datos) => {
    const nuevosErrores = validarDatos(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return {
        exito: false,
        mensaje: 'Corrige los errores antes de continuar',
      };
    }

    setCargando(true);

    try {
      // Determinar si es edición o creación basado en la existencia de ID
      const esEdicion = !!datos.id;

      let resultado;
      if (esEdicion) {
        resultado = await RepositorioActualizarEmpleado.actualizar(datos);
        return {
          exito: true,
          mensaje: 'Empleado actualizado correctamente',
        };
      } else {
        resultado = await RepositorioCrearEmpleado.crear(datos);
        return {
          exito: true,
          mensaje: 'Empleado creado correctamente',
        };
      }
    } catch (error) {
      return {
        exito: false,
        mensaje: error.message || 'Error al guardar el empleado',
      };
    } finally {
      setCargando(false);
    }
  };

  return {
    errores,
    cargando,
    handleGuardar,
    CAMPO_OBLIGATORIO,
  };
};
