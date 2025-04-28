import { useEffect, useState } from 'react';
import { RepositorioListaCuotas } from '../../Dominio/repositorios/Cuotas/repositorioListaCuotas';

export function useConsultarCuotas() {
  const [cuotas, setCuotas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { cuotas, mensaje } = await RepositorioListaCuotas.obtenerLista();
        console.log('Cuotas fetched:', cuotas); // Debugging
        setCuotas(cuotas);
        setMensaje(mensaje);
      } catch (err) {
        console.error('Error fetching cuotas:', err); // Debugging
        setCuotas([]);
        setMensaje('');
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return { cuotas, mensaje, cargando, error };
}