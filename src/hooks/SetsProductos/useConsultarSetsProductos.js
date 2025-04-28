import { useEffect, useState } from 'react';
import { RepositorioConsultarSetsProductos } from '../../dominio/repositorios/SetsProductos/RepositorioConsultarSetsProductos';

/**
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 * Hook para consultar la lista de sets de productos.
 * agregar comentarios */
export function useConsultarSetsProductos() {
  const [grupos, setGrupos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarToken, setRecargarToken] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { setsProductos, mensaje } = await RepositorioConsultarSetsProductos.obtenerLista();

        setGrupos(setsProductos);
        setMensaje(mensaje);
      } catch (err) {
        setGrupos([]); // Corregí este nombre de setSetsProductos a setGrupos
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

  return { grupos, mensaje, cargando, error, recargar }; // Cambié 'setsProductos' a 'grupos' aquí también
}
