//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

import { useState, useEffect, useMemo } from 'react';
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
        console.error(err);
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

  // ✅ Objeto con los métodos como claves e id/habilitado como valores
  const tipoPagosMapeado = useMemo(() => {
    return tipoPagos.reduce((acc, tipo) => {
      acc[tipo.metodo] = {
        id: tipo.idTipoPago,
        habilitado: tipo.habilitado,
      };
      return acc;
    }, {});
  }, [tipoPagos]);

  return {
    tipoPagos, // arreglo original con idTipoPago, metodo, habilitado
    tipoPagosMapeado, // objeto: { credito: { id, habilitado }, ... }
    mensaje,
    cargando,
    error,
    recargar,
  };
}
