// useActualizarCuota.js - Versión Simple
import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export const useActualizarCuota = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const actualizarCuota = async (datos) => {
    setCargando(true);
    setError(false);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/cuotas/actualizar-set-cuotas`,
        datos,
        {
          headers: { 'x-api-key': API_KEY },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      setError(true);
      throw new Error(err.response?.data?.mensaje || 'Error al actualizar');
    } finally {
      setCargando(false);
    }
  };

  return { actualizarCuota, cargando, error };
};