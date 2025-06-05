import { useState, useCallback } from 'react';
import { RepositorioCrearCategoria } from '@Repositorios/Categorias/repositorioCrearCategorias';
import { CrearCategoria } from '@Modelos/Categorias/CrearCategoria';

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
        throw new Error(resultado.data?.mensaje || resultado.data?.error || 'Error desconocido');
      }
    } catch (err) {
      setExito(false);
      setError(true);

      // Consolidated error handling for all possible response formats
      let errorMessage = 'Ocurrió un error al crear la categoría';

      if (err.response?.data) {
        // Try different possible error message fields from backend
        errorMessage = err.response.data.mensaje
          || err.response.data.error
          || err.response.data.message
          || errorMessage;
      } else if (err.message) {
        // Handle direct Error messages (including those thrown from repository)
        errorMessage = err.message;
      }

      setMensaje(errorMessage);
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