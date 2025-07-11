import { useEffect, useState } from 'react';
import { RepositorioListaCuotas } from '@Repositorios/Cuotas/repositorioListaCuotas';

export function useConsultarCuotas() {
  const [cuotas, setCuotas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);

    try {
      const { cuotas, mensaje } = await RepositorioListaCuotas.obtenerLista();
      setCuotas(cuotas);
      setMensaje(mensaje);
    } catch (err) {
      setCuotas([]);
      setMensaje('');
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { cuotas, mensaje, cargando, error, recargar: cargar };
}

