//RF[19] Super Administrador Actualiza Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

import { useState } from 'react';
import { RepositorioActualizarEmpleado } from '@Repositorios/Empleados/RepositorioActualizarEmpleado';

export function useActualizarEmpleado() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const actualizar = async (cambios) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarEmpleado.actualizar(cambios);
      setMensaje(respuesta.mensaje || 'Actualización exitosa');
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setCargando(false);
    }
  };
  return { actualizar, cargando, error, mensaje };
}
