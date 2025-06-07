import { useState, useEffect } from 'react';
import { useAuth } from '@Hooks/AuthProvider';
import obtenerProductos from '@Servicios/obtenerProductos';

export const useObtenerOpcionesCuotas = () => {
  const { usuario } = useAuth();
  const idCliente = usuario?.clienteSeleccionado;

  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    if (!idCliente) {
      return;
    }

    const cargarOpciones = async () => {
      setCargando(true);
      setError(null);

      try {
        const productos = await obtenerProductos(idCliente);
        setOpciones(productos);
      } catch  {
        setError('No se pudieron cargar las opciones de productos');
        setOpciones([]);
      } finally {
        setCargando(false);
      }
    };

    cargarOpciones();
  }, [idCliente]);

  return { opciones, cargando, error };
};
