//RF[03] Leer usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3]

import { useEffect, useState } from "react";
import { RepositorioUsuarios } from "../../dominio/repositorios/Usuarios/repositorioLeerUsuario";

/**
 * Hook para obtener los datos de un usuario por su ID
 * @param {number} idUsuario - ID del usuario a consultar
 * @returns {{
 *   usuario: UsuarioLectura | null,
 *   mensaje: string,
 *   cargando: boolean,
 *   error: string | null
 * }}
 */
export const useUsuarioId = (idUsuario) => {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      setCargando(true);
      setError(null);

      try {
        const repo = new RepositorioUsuarios();
        const { usuario, mensaje } = await repo.obtenerPorId(idUsuario);

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