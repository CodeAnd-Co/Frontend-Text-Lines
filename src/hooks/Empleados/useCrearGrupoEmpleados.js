import { useState } from 'react';
import { crearGrupoEmpleados } from '@Repositorios/Empleados/RepositorioCrearGrupoEmpleado';
import { validarDatosCrearGrupoEmpleado } from '@Modelos/Empleados/modeloCrearGrupoEmpleado';
import { useConsultarGrupos } from '@Hooks/Empleados/useConsultarGrupos';

export const useCrearGrupoEmpleados = () => {
  const { grupos } = useConsultarGrupos();
  const [errores, setErrores] = useState({});
  const [mensajeErrorBack, setMensajeErrorBack] = useState('');

  const handleGuardarGrupoEmpleados = async (datosGrupo) => {
    const empleadosSeleccionados = datosGrupo.listaEmpleados?.filter(Boolean) || [];

    const datosLimpiados = {
      ...datosGrupo,
      listaEmpleados: empleadosSeleccionados,
    };

    const erroresValidacion = validarDatosCrearGrupoEmpleado(datosLimpiados, grupos);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      setMensajeErrorBack('');
      return { exito: false, errores: erroresValidacion };
    }

    const datosParaEnviar = {
      nombreGrupo: datosGrupo.nombreGrupo,
      descripcion: datosGrupo.descripcion,
      listaEmpleados: empleadosSeleccionados.map(emp => emp.idEmpleado ?? emp.id),
    };

    try {
      const response = await crearGrupoEmpleados(datosParaEnviar);
      if (response?.error) {
        if (response.error === 'Ya existe un grupo con ese nombre.') {
          setErrores({ nombreGrupo: response.error });
        }
        return { exito: false, mensaje: response.error };
      }
      return { exito: true, mensaje: 'Grupo creado correctamente' };
    } catch (error) {
      return {
        exito: false,
        mensaje: 'Error al crear el grupo',
      };
    }
  };

  const limpiarErrores = () => {
    setErrores({});
    setMensajeErrorBack('');
  };

  return { errores, handleGuardarGrupoEmpleados, limpiarErrores };
};