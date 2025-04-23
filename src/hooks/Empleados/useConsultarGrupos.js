import { useEffect, useState } from 'react';
import { RepositorioConsultarGrupos } from '../../Dominio/repositorios/Empleados/RepositorioConsultarGrupos';

export function useConsultarGrupos() {
  const [grupos, setGrupos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const { grupoEmpleados, mensaje } = await RepositorioConsultarGrupos.consultarGrupos();
        setGrupos(grupoEmpleados);
        setMensaje(mensaje);
      } catch (err) {
        setGrupos([]);
        setMensaje('');
        setError(err.message || 'Ocurrió un error al consultar los grupos');
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  return { grupos, mensaje, cargando, error };
}
