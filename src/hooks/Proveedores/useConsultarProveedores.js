//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
import { useEffect, useState } from 'react';
import { RepositorioConsultarProveedores } from '@Repositorios/Proveedores/RepositorioConsultarProveedores';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Utilidades/Constantes/permisos';

export function useConsultarProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();

  /**
   * Hook para consultar la lista de proveedores.
   * @param void
   * @returns {{
   *   proveedores: Proveedor[],
   *   mensaje: string,
   *   cargando: boolean,
   *   error: string | null
   * }}
   */

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      if (!usuario?.permisos?.includes(PERMISOS.CREAR_PRODUCTO)) {
        setCargando(false);
        return;
      }

      try {
        const { mensaje, listaProveedores } 
            = await RepositorioConsultarProveedores.consultarLista();
        setProveedores(listaProveedores);
        setMensaje(mensaje);
      } catch (err) {
        setProveedores([]);
        setMensaje('');
        setError(err.message || 'Ocurrió un error al consultar los proveedores');
      } finally {
        setCargando(false);
      }
    };

    if (usuario) cargar();
  }, [usuario]);

  return { proveedores, mensaje, cargando, error };
}