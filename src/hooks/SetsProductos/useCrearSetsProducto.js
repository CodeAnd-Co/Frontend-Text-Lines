import { useState, useCallback } from 'react';
import { RepositorioCrearSetsProducto } from '@Repositorios/SetsProductos/RepositorioCrearSetsProducto.js';
import { CrearSetsProducto } from '@Modelos/SetsProductos/CrearSetsProductos';

const useCrearSetsProducto = () => {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const crearSetsProducto = useCallback(async ({ nombre, nombreVisible, descripcion, productos }) => {
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      const productosTransformados = productos.map((producto) => ({
        idProducto: producto.id,
      }));

      const nuevoSetsProducto = new CrearSetsProducto({
        nombre,
        nombreVisible,
        descripcion,
        productos: productosTransformados,
      });


      const resultado = await RepositorioCrearSetsProducto.crearSetsProducto(nuevoSetsProducto);

      if (resultado.data.mensaje) {
        setExito(true);
        setMensaje(resultado.data.mensaje);
        return resultado;
      } else {
        throw new Error(resultado.data?.mensaje || 'Error desconocido');
      }
    } catch (err) {
      setExito(false);
      setError(true);

      if (err.response?.data?.error) {
        setMensaje(err.response.data.error);
      } else if (err instanceof Error) {
        setMensaje(err.message);
      } else {
        setMensaje('Ocurrió un error al crear el set de productos');
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
    crearSetsProducto,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
  };
};

export default useCrearSetsProducto;