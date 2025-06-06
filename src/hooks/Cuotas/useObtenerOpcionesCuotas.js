import { useState, useEffect } from 'react';
import { useAuth } from '@Hooks/AuthProvider';
import { RepositorioObtenerOpcionesCuotas } from '@Dominio/Repositorios/Cuotas/repositorioObtenerOpcionesCuotas';

export const useObtenerOpcionesCuotas = () => {
  const { usuario } = useAuth();
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerOpciones = async () => {
    if (!usuario?.clienteSeleccionado?.idCliente) {
      setError('No hay cliente seleccionado');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const resultado = await RepositorioObtenerOpcionesCuotas.obtenerOpciones(
        usuario.clienteSeleccionado.idCliente
      );
      
      console.log('🔍 Opciones obtenidas del backend:', resultado);
      setOpciones(resultado || []);
    } catch (err) {
      console.error('❌ Error al obtener opciones:', err);
      setError(err.message || 'Error al obtener opciones de productos');
      setOpciones([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (usuario?.clienteSeleccionado?.idCliente) {
      obtenerOpciones();
    }
  }, [usuario?.clienteSeleccionado?.idCliente]);

  return {
    opciones,
    cargando,
    error,
    recargar: obtenerOpciones
  };
};