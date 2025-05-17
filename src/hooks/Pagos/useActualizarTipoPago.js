//RF[54] Consulta Lista de Pagos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF54]

import { useState } from 'react';
import { RepositorioActualizarTipoPago } from '@Repositorios/Pagos/RepositorioActualizarTipoPago';

export function useActualizarTipoPago() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const actualizar = async (cambios) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
      const respuesta = await RepositorioActualizarTipoPago.actualizar(cambios);
      setMensaje(respuesta.mensaje || 'Actualización exitosa');
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setCargando(false);
    }
  };

  return { actualizar, cargando, error, mensaje };
}
