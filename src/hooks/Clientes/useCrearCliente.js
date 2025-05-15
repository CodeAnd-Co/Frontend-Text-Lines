import { useState, useCallback } from 'react';
import { RepositorioCrearCliente} from '@Repositorios/Clientes/repositorioCrearCliente';
import { CrearCliente } from '@Modelos/Clientes/CrearCliente';

const useCrearCliente = () => {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const crearCliente = useCallback(async ({ nombreComercial, nombreFiscal, imagen }) => {
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      const nuevoCliente = new CrearCliente({
        nombreComercial,
        nombreFiscal,
        imagen,
      });

      const resultado = await RepositorioCrearCliente.crearCliente(nuevoCliente);

      if (resultado.data.exito) {
        setExito(true);
        setMensaje(resultado.data.exito);
        return resultado;
      } else {
        // In case there's an error in the successful response
        throw new Error(resultado.data?.error || 'Error desconocido');
      }
    } catch (err) {
      setExito(false);
      setError(true);

      // Handle backend error message
      if (err.response?.data?.error) {
        // Backend API error with error message
        setMensaje(err.response.data.error);
      } else if (err instanceof Error) {
        // Error thrown manually or from other sources
        setMensaje(err.message);
      } else {
        // Fallback error message
        setMensaje('Ocurrió un error al crear el cliente');
      }

      return false;
    } finally {
      setCargando(false);
    }
  }, []);

  const resetEstado = () => {
    setExito(false);
    setError(false);
    setMensaje('');
  };

  return {
    crearCliente,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
  };
};

export default useCrearCliente;
