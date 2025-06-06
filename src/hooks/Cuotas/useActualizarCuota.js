import { useState } from 'react';
import { RepositorioActualizarCuota } from '@Repositorios/Cuotas/repositorioActualizarCuota';

export const useActualizarCuota = () => {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const actualizarCuota = async (datosActualizacion) => {
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      const resultado = await RepositorioActualizarCuota.actualizarSetCuotas(datosActualizacion);
      setExito(true);
      setMensaje(resultado.mensaje);
      return resultado;
    } catch (err) {
      setError(true);
      setMensaje(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { actualizarCuota, cargando, exito, error, mensaje, setError };
};