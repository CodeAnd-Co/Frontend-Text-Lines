// RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
import { useEffect, useState } from 'react';
import { RepositorioConsultarPedidos } from '@Repositorios/Pedidos/RepositorioConsultarPedidos';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';

/**
 * Hook para consultar la lista de pedidos.
 * @returns {{
 *   pedidos: Pedido[],
 *   mensaje: string,
 *   cargando: boolean,
 *   error: string | null
 *   recargar: () => void
 * }}
 */
export function useConsultarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();
  const [recargarToken, setRecargarToken] = useState(1);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      if (!usuario?.permisos?.includes(PERMISOS.CONSULTAR_PEDIDOS)) {
        setCargando(false);
        return;
      }

      try {
        const { pedidos, mensaje } = await RepositorioConsultarPedidos.consultarPedidos();
        setPedidos(pedidos);
        setMensaje(mensaje);
      } catch (err) {
        setPedidos([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [recargarToken, usuario?.permisos]);

  /**
   * Incrementa el token de recarga para volver a disparar la consulta.
   */
  const recargar = () => {
    setRecargarToken((prev) => {
      return prev + 1;
    });
  };

  return { pedidos, mensaje, cargando, error, recargar };
}
