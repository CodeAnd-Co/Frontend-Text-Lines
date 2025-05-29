import { useState, useEffect } from 'react';
import { RepositorioImportarProductos } from '@Repositorios/Productos/RepositorioImportarProductos';

/**
 * Hook para importar productos masivamente desde un CSV (sin imágenes).
 *
 * @returns {{
 *   importar: (productosParseados: Array<Object>) => Promise<void>,
 *   cargando: boolean,
 *   errores: Array<{ fila: number|string, error: string }>,
 *   exito: boolean
 * }}
 */
const useImportarProductos = () => {
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState([]);
  const [exito, setExito] = useState(false);

  const importar = async (productosParseados) => {
    setCargando(true);
    setErrores([]);
    setExito(false);
    
    try {
      console.log('Importando productos:', productosParseados);
      const respuesta = await RepositorioImportarProductos.importarProductos(productosParseados);

      if (respuesta.errores) {
        setErrores(respuesta.errores);
      } else {
        setExito(true);
      }
    } catch (err) {
      setErrores([{ fila: '-', error: err.message }]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(false), 0);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  return { importar, cargando, errores, exito };
};

export default useImportarProductos;
