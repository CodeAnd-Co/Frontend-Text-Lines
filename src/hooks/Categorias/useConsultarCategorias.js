import { useEffect, useState } from "react";
import { RepositorioListaCategorias } from "../../dominio/repositorios/Categorias/repositorioListaCategorias";

/**
 * Hook para consultar la lista de categorías.
 * @param {Object} opciones - Parámetros como { limit, offset }
 * @returns {{
 *   categorias: Categoria[],
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string,
 *   recargar: () => void
 * }}
 */
export function useConsultarCategorias({ limit = 10, offset = 0 } = {}) {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const repositorio = new RepositorioListaCategorias();

    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { categorias, mensaje } = await repositorio.obtenerLista({ limit, offset });
        setCategorias(categorias);
        setMensaje(mensaje);
      } catch (err) {
        setCategorias([]);
        setMensaje("");
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [limit, offset, recargarToken]);

  const recargar = () => {
    setRecargarToken((prev) => prev + 1);
  };

  return { categorias, mensaje, cargando, error, recargar };
}