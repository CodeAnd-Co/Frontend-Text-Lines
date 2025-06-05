// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

import { useState } from 'react';
import { RepositorioActualizarSetProducto } from '@Repositorios/SetsProductos/RepositorioActualizarSetProducto';

export function useActualizarEmpleado() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const actualizar = async (cambios) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarSetProducto.actualizar(cambios);
      setMensaje(respuesta.mensaje || 'Actualización exitosa');
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setCargando(false);
    }
  };
  return { actualizar, cargando, error, mensaje };
}
