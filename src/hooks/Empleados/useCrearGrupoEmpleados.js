// Importación de hooks y funciones necesarias.
import { useState } from 'react';
import { crearGrupoEmpleados } from '@Repositorios/Empleados/RepositorioCrearGrupoEmpleado';
import { validarDatosCrearGrupoEmpleado } from '@Modelos/Empleados/modeloCrearGrupoEmpleado';
import { useConsultarGrupos } from '@Hooks/Empleados/useConsultarGrupos';

/**
 * Hook personalizado para manejar la lógica de creación de grupos de empleados.
 *
 * @returns {object} Contiene:
 * - `errores`: objeto con errores de validación por campo.
 * - `handleGuardarGrupoEmpleados`: función para enviar los datos al backend.
 * - `limpiarErrores`: función para limpiar errores del formulario.
 */
export const useCrearGrupoEmpleados = () => {
  const { grupos } = useConsultarGrupos(); // Consulta los grupos ya existentes para validar duplicados.

  const [errores, setErrores] = useState({});
  const [setMensajeErrorBack] = useState('');

  /**
   * Maneja la validación y envío de los datos al backend para crear un grupo de empleados.
   *
   * @async
   * @function handleGuardarGrupoEmpleados
   * @param {object} datosGrupo - Objeto con los datos del nuevo grupo.
   * @param {string} datosGrupo.nombreGrupo - Nombre del grupo.
   * @param {string} datosGrupo.descripcion - Descripción del grupo.
   * @param {Array<object>} datosGrupo.listaEmpleados - Lista de empleados seleccionados.
   * @returns {Promise<object>} Objeto con estructura:
   * - `{ exito: true, mensaje }` si fue exitoso.
   * - `{ exito: false, errores }` si falló la validación.
   * - `{ exito: false, mensaje }` si falló el backend.
   */
  const handleGuardarGrupoEmpleados = async (datosGrupo) => {
    // Filtra empleados válidos (evita `null` o `undefined`)
    const empleadosSeleccionados = datosGrupo.listaEmpleados?.filter(Boolean) || [];

    // Limpia y normaliza los datos antes de validar
    const datosLimpiados = {
      ...datosGrupo,
      listaEmpleados: empleadosSeleccionados,
    };

    // Ejecuta validación con modelo externo
    const erroresValidacion = validarDatosCrearGrupoEmpleado(datosLimpiados, grupos);
    setErrores(erroresValidacion);

    // Si hay errores, no se envía al backend
    if (Object.keys(erroresValidacion).length > 0) {
      setMensajeErrorBack('');
      return { exito: false, errores: erroresValidacion };
    }

    // Prepara payload final para enviar (solo IDs)
    const datosParaEnviar = {
      nombreGrupo: datosGrupo.nombreGrupo,
      descripcion: datosGrupo.descripcion,
      listaEmpleados: empleadosSeleccionados.map(emp => emp.idEmpleado ?? emp.id),
    };

    try {
      // Llama al repositorio para crear el grupo
      const response = await crearGrupoEmpleados(datosParaEnviar);

      // Si backend respondió con error
      if (response?.error) {
        if (response.error === 'Ya existe un grupo con ese nombre.') {
          setErrores({ nombreGrupo: response.error });
        }
        return { exito: false, mensaje: response.error };
      }

      // Éxito en la creación
      return { exito: true, mensaje: 'Grupo creado correctamente' };
    } catch {
    return {
        exito: false,
        mensaje: 'Error al crear el grupo',
    };
    }
  };

  /**
   * Limpia los errores del formulario y los errores del backend.
   *
   * @function limpiarErrores
   */
  const limpiarErrores = () => {
    setErrores({});
    setMensajeErrorBack('');
  };

  return {
    errores,
    handleGuardarGrupoEmpleados,
    limpiarErrores,
  };
};