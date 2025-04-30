import { useState } from 'react';
import axios from 'axios';
import { RUTAS_API } from '../../Utilidades/Constantes/rutasAPI';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useCrearRol = () => {
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const crearRol = async (nombre, descripcion, permisos, callbackSuccess = () => {}) => {
    setCargando(true);
    setExito(false);
    setError(false);

    try {
      const respuesta = await axios.post(
        RUTAS_API.ROLES.CREAR_ROL,
        { nombre, descripcion, permisos: permisos.map((permiso) => permiso.id) },
        {
          headers: {
            'x-api-key': API_KEY,
          },
          withCredentials: true,
        }
      );

      if (respuesta.data.mensaje) {
        setExito(true);
        setMensaje(respuesta.data.mensaje);
        callbackSuccess();
      } else {
        throw new Error('Error al crear el rol.');
      }
    } catch (err) {
      setError(true);
      if (axios.isAxiosError(err) && err.response?.data?.mensaje) {
        setMensaje(err.response.data.mensaje);
      } else {
        setMensaje('Ocurrió un error inesperado.');
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
    crearRol,
    exito,
    error,
    mensaje,
    cargando,
    resetEstado,
  };
};
