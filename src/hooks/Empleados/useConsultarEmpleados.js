//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
import { useEffect, useState } from 'react';
import { RepositorioConsultarEmpleados } from '../../Dominio/repositorios/Empleados/RepositorioConsultarEmpleados';
import { useAuth } from '../../hooks/AuthProvider';
import { PERMISOS } from '../../Utilidades/Constantes/permisos';

export function useConsultarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();
  const [recargarToken, setRecargarToken] = useState(0);

  /**
   * Hook para consultar la lista de empleados.
   * @param void
   * @returns {{
   *   empleados: Empleado[],
   *   mensaje: string,
   *   cargando: boolean,
   *   error: string | null
   * }}
   */

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      if (!usuario?.permisos?.includes(PERMISOS.CONSULTAR_EMPLEADOS)) {
        setCargando(false);
        return;
      }

      try {
        const { empleados, mensaje } = await RepositorioConsultarEmpleados.consultarLista();
        setEmpleados(empleados);
        setMensaje(mensaje);
      } catch (err) {
        setEmpleados([]);
        setMensaje('');
        setError(err.message || 'Ocurrió un error al consultar los empleados');
      } finally {
        setCargando(false);
      }
    };

    cargar();

  }, [recargarToken, usuario]);
     const recargar = () => {
        setRecargarToken((prev) => prev + 1);
      };

  return { empleados, mensaje, cargando, error, recargar };
}

