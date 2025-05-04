//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import { useEffect, useState } from 'react';
import { RepositorioListaProductos } from '../../dominio/repositorios/Productos/RepositorioListaProductos';

/**
 * Hook para consultar la lista de productos.
 * @param void
 * @returns {{
 *   productos: Producto[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *  recargar: () => void
 * }}
 */
export function useConsultarProductos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const { mensaje, listaProductos } = await RepositorioListaProductos.obtenerLista();
        setProductos(listaProductos);
        setMensaje(mensaje);
      } catch (err) {
        setProductos([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [recargarToken]);
  const recargar = () => {
    setRecargarToken((prev) => prev + 1);
  };

  return { productos, mensaje, cargando, error, recargar };
}
