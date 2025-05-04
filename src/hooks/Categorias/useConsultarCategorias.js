import { useEffect, useState } from 'react';
import { RepositorioListaCategorias } from '../../Dominio/Repositorios/Categorias/repositorioListaCategorias';

/**
 * Hook para consultar la lista de categorías.
 * @returns {{
 *   categorias: Categoria[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 * @see [RF[47] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */
export function useConsultarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { categorias, mensaje } = await RepositorioListaCategorias.obtenerLista();
        setCategorias(categorias);
        setMensaje(mensaje);
      } catch (err) {
        setCategorias([]);
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

  return { categorias, mensaje, cargando, error, recargar };
}
