import { useState, useEffect } from 'react';
import { useAuth } from '@Hooks/AuthProvider';
import { RepositorioConsultarTipoPagos } from '@Repositorios/Pagos/RepositorioConsultarTipoPagos';
import { PERMISOS } from '@Constantes/permisos';

export function useConsultarTipoPagos() {
  const [tipoPagos, setTipoPagos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();
  const [recargarToken, setRecargarToken] = useState(1);
  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      if (!usuario?.permisos?.includes(PERMISOS.CONSULTAR_TIPOS_PAGO)) {
        setCargando(false);
        return;
      }

      try {
        const resultado = await RepositorioConsultarTipoPagos.consultarPagos();
        setTipoPagos(resultado.listaTipoPagos);
        setMensaje(resultado.mensaje || 'Consulta exitosa');
      } catch (err) {
        console.log(err);
        setTipoPagos([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [recargarToken, usuario?.permisos]);

  const recargar = () => setRecargarToken((prev) => prev + 1);

  return { tipoPagos, mensaje, cargando, error, recargar };
}
