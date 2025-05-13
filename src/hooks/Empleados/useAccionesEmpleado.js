import { useState } from 'react';
import { RepositorioActualizarEmpleado } from '@Repositorios/Empleados/RepositorioActualizarEmpleado';
import { validarDatosActualizarEmpleado } from '@Modelos/Empleados/ActualizarEmpleado';

export const useAccionesEmpleado = () => {
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  const handleGuardar = async (datos, empleadosExistentes = []) => {
    // Usar el validador universal
    const nuevosErrores = validarDatosActualizarEmpleado(datos, empleadosExistentes);
    setErrores(nuevosErrores);

    try {
      // Determinar si es edición o creación basado en la existencia de ID
      const esEdicion = !!datos.id;

      if (esEdicion) {
        console.log('Enviando datos para actualización desde hook:', datos);

        await RepositorioActualizarEmpleado.actualizar(datos);
        return {
          exito: true,
          mensaje: 'Empleado actualizado correctamente',
        };
      } else {
        // Lógica para crear
        console.log('Crear empleado');
      }
    } catch (error) {
      console.error('Error completo:', error);
      return {
        exito: false,
        mensaje: error.message || 'Error al guardar el empleado',
      };
    }

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

      //let resultado;
      if (esEdicion) {
        console.log('Enviando datos para actualización:', datos);

        const datosActualizacion = {
          ...datos,
          id: datos.id || datos.idEmpleado, // Asegura que exista un campo 'id'
        };

        await RepositorioActualizarEmpleado.actualizar(datosActualizacion);
        return {
          exito: true,
          mensaje: 'Empleado actualizado correctamente',
        };
      } else {
        // Lógica para crear
      }
    } catch (error) {
      console.error('Error completo:', error);
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
