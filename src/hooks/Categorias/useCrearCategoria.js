import { useState, useCallback } from 'react';
import { RepositorioCrearCategoria } from '../../dominio/repositorios/Categorias/repositorioCrearCategorias';
import { CrearCategoria } from '../../dominio/modelos/Categorias/CrearCategoria';

const useCrearCategoria = () => {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const crearCategoria = useCallback(async ({ nombreCategoria, descripcion, productos }) => {
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');

    try {
      // Transformar productos para que solo contenga idProducto
      const productosTransformados = productos.map((producto) => ({
        idProducto: producto.id,
      }));

      const nuevaCategoria = new CrearCategoria({
        nombreCategoria,
        descripcion,
        productos: productosTransformados,
      });

      const resultado = await RepositorioCrearCategoria.crearCategoria(nuevaCategoria);

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
        setMensaje('Ocurrió un error al crear la categoría');
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
    crearCategoria,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
  };
};

export default useCrearCategoria;
