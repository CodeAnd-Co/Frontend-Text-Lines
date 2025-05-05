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
 * }}
 */
export function useConsultarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();

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

    if (usuario) cargar();
  }, [usuario]);

  return { pedidos, mensaje, cargando, error };
}
