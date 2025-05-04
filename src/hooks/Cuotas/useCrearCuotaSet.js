import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CuotaSetModelo from '../../Dominio/modelos/Cuotas/CuotaSetModelo';
import { RUTAS_API } from '../../Utilidades/Constantes/rutasAPI';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const useCrearCuotaSet = ({
  nombreCuotaSet,
  descripcion,
  periodoRenovacion,
  renovacionActiva,
  productos,
  cuotas,
  redirectPath = '/admin/tablero/cuotas',
}) => {
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  // Control de errores y tiempo
  const erroresRef = useRef(0);
  const ultimoErrorRef = useRef(null);
  const bloqueadoRef = useRef(false);

  const enviarCuota = async () => {
    // Verifica si está bloqueado
    const ahora = Date.now();
    if (bloqueadoRef.current) {
      setError(true);
      setMensaje('Demasiados intentos fallidos. Intenta más tarde.');
      return;
    }

    setCargando(true);

    const modelo = new CuotaSetModelo({
      nombreCuotaSet,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada: renovacionActiva,
      productos,
      limites: cuotas,
    });
    try {
      const respuesta = await axios.post(RUTAS_API.CUOTAS.CREAR_CUOTA, modelo, {
        headers: { 'x-api-key': API_KEY },
        withCredentials: true,
      });

      if (respuesta.data.exito) {
        setExito(true);
        setError(false);
        setMensaje(respuesta.data.exito);

        erroresRef.current = 0; // resetear errores en éxito
        bloqueadoRef.current = false;

        setTimeout(() => {
          navigate(redirectPath);
        }, 2000);
      } else {
        throw new Error(respuesta.data?.error || 'Error desconocido');
      }
    } catch (err) {
      setError(true);
      setExito(false);

      let mensajeError = 'Ocurrió un error, intenta más tarde.';

      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          mensajeError = err.response.data.error;
        } else if (err.message === 'Network Error') {
          mensajeError = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        }
      } else if (err instanceof Error) {
        mensajeError = err.message || mensajeError;
      }

      setMensaje(mensajeError);

      // Aumentar contador de errores
      erroresRef.current += 1;
      ultimoErrorRef.current = ahora;

      if (erroresRef.current >= 10) {
        bloqueadoRef.current = true;

        // Desbloquear después de 10 segundos
        setTimeout(() => {
          erroresRef.current = 0;
          bloqueadoRef.current = false;
        }, 10000);
      }
    } finally {
      setCargando(false);
    }
  };

  const resetEstado = () => {
    setExito(false);
    setError(false);
    setMensaje('');
  };

  return {
    enviarCuota,
    exito,
    error,
    mensaje,
    cargando,
    resetEstado,
    setExito,
    setError,
    setMensaje,
  };
};
