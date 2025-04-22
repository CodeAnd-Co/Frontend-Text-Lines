import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cuotaSetModelo from '../dominio/modelos/cuotaSetModelo';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const useCrearCuotaSet = ({
  nombreCuotaSet,
  descripcion,
  periodoRenovacion,
  renovacionActiva,
  productos,
  cuotas,
  redirectPath = '/admin/cuotas', // Ruta de redirección por defecto
  idCliente = 102,
}) => {
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const enviarCuota = async () => {
    setCargando(true);
    const modelo = new cuotaSetModelo({
      idCliente,
      nombreCuotaSet,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada: renovacionActiva,
      productos,
      limites: cuotas,
    });

    try {
      const respuesta = await axios.post(`${API_URL}/api/cuotas/crear-cuota`, modelo, {
        headers: {
          'x-api-key': API_KEY,
        },
      });

      if (respuesta.data.exito) {
        setExito(true);
        setError(false);
        setMensaje(respuesta.data.exito);

        // Redirección después de mostrar el mensaje de éxito
        setTimeout(() => {
          navigate(redirectPath);
        }, 2000); // Espera 2 segundos para que el usuario pueda ver el mensaje
      } else if (respuesta.data.error) {
        setError(true);
        setExito(false);
        setMensaje(respuesta.data.error);
      }
    } catch (error) {
      setError(true);
      setExito(false);
      setMensaje(error instanceof Error ? error.message : String(error));
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
