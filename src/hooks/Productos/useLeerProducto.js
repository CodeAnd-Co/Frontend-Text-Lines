import { useEffect, useState } from 'react';
import { RepositorioLeerProducto } from '@Repositorios/Productos/RepositorioLeerProducto.js';

export const useLeerProducto = (idProducto) => {
  const [detalleProducto, setDetalleProducto] = useState(null)
  const [cargando, setCargando] =useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerInfoProducto = async () => {
      setCargando(true)
      setError(null)

      try{
        const productoInfo = await RepositorioLeerProducto.obtenerPorId(idProducto);
        setDetalleProducto(productoInfo)
      }catch (err) {
        setError(err.message)
      }finally {
        setCargando(false)
      }
    }

    if(idProducto) {
      obtenerInfoProducto()
    }
  }, [idProducto]);

  return {detalleProducto, cargando, error}
}