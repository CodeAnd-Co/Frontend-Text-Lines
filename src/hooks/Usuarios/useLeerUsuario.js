import { useEffect, useState } from 'react';
import { RepositorioUsuarios } from '../../Dominio/Repositorios/Usuarios/repositorioLeerUsuario';

/**
 * Hook para obtener los datos de un usuario por su ID
 * @param {number} idUsuario - ID del usuario a consultar
 * @returns {{
 *   usuario: UsuarioLectura | null,
 *   mensaje: string,
 *   cargando: boolean,
 *   error: string | null
 * }}
 *
 * @see [RF[03] Leer usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3)
 */
export const useUsuarioId = (idUsuario) => {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      setCargando(true);
      setError(null);

      try {
        const { usuario, mensaje } = await RepositorioUsuarios.obtenerPorId(idUsuario);

        setUsuario(usuario);
        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (idUsuario) {
      obtenerUsuario();
    }
  }, [idUsuario]);

  return { usuario, mensaje, cargando, error };
};
