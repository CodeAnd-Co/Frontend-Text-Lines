import { useState } from 'react';
import { RepositorioEliminarUsuarios } from '@Repositorios/Usuarios/repositorioEliminarUsuario';
import { useVerificar2FA } from '@Hooks/Usuarios/useVerificar2FA';


/**
 * Hook para manejar la eliminación de usuarios
 * @param {function} onAlerta - Función para mostrar alertas
 * @param {function} onRecarga - Función para recargar datos después de eliminar
 * @returns {Object} - Funciones y estados para manejar la eliminación
 */
export function useEliminarUsuarios(onAlerta, onRecarga) {
  const [abrirPopUp, setAbrirPopUp] = useState(false);
  const [abrirModal2FA, setAbrirModal2FA] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [usuariosAEliminar, setUsuariosAEliminar] = useState({
    type: 'include',
    ids: new Set(),
    rol: new Set(),
  });

  const { verificar2FA, cargando: cargando2FA, error: error2FA } = useVerificar2FA();
  const [codigo2FA, setCodigo2FA] = useState(null);
  const [usuarioSolicitante, setUsuarioSolicitante] = useState(null);

  const manejarSeleccion = (seleccionados) => {
    setUsuariosAEliminar((prev) => ({
      ...prev,
      ids: seleccionados.ids || new Set(),
      rol: seleccionados.rol || new Set(),
    }));
  };

  const manejarAbrirPopUp = (usuarioActual) => {
    setUsuarioSolicitante(usuarioActual);

    if (usuariosAEliminar.ids.size === 0) {
      onAlerta({ tipo: 'error', mensaje: 'Por favor selecciona al menos un usuario para eliminar.' });
    } else if (usuariosAEliminar.rol.has('Super Administrador')) {
      setAbrirModal2FA(true);
    } else {
      setAbrirPopUp(true);
    }
  };

  const manejarCerrarPopUp = () => {
    setAbrirPopUp(false);
  };

  const manejarCerrarModal2FA = () => {
    setAbrirModal2FA(false);
  };

  const manejarVerificar2FA = async (codigo) => {
    const idUsuario = usuarioSolicitante?.idUsuario || usuarioSolicitante?.id || null;

    if (!idUsuario) {
      onAlerta({ tipo: 'error', mensaje: 'No se pudo identificar al usuario actual para verificar 2FA.' });
      return;
    }

    try {
      const resultado = await verificar2FA({ idUsuario, codigo });

      if (resultado?.mensaje?.toLowerCase().includes('correctamente')) {
        setCodigo2FA(codigo);
        setAbrirModal2FA(false);
        setAbrirPopUp(true);
      } else {
        onAlerta({ tipo: 'error', mensaje: 'Código 2FA inválido o expirado.' });
      }
    } catch (error) {
      onAlerta({ tipo: 'error', mensaje: error.message || 'Error en la verificación 2FA.' });
    }
  };

  const eliminarUsuarios = async () => {
    setCargando(true);
    try {
      const idsArray = Array.from(usuariosAEliminar.ids);

      const respuesta = await RepositorioEliminarUsuarios.eliminarUsuarios({
        ids: idsArray,
        codigo2FA: codigo2FA || undefined,
      });

      setAbrirPopUp(false);

      const exito = respuesta.mensaje && respuesta.mensaje.toLowerCase().includes('eliminados correctamente');

      if (exito) {
        onAlerta({ tipo: 'success', mensaje: 'Usuario(s) eliminado(s)' });
        setUsuariosAEliminar({ type: 'include', ids: new Set(), rol: new Set() });
        setCodigo2FA(null);
        if (onRecarga) onRecarga();
      }

      return respuesta;
    } catch (error) {
      onAlerta({ tipo: 'error', mensaje: `Error al eliminar usuarios: ${error.message}` });
      setAbrirPopUp(false);
      return { exito: false, mensaje: error.message };
    } finally {
      setCargando(false);
    }
  };

  return {
    usuariosAEliminar,
    abrirPopUp,
    cargando,
    abrirModal2FA,
    error2FA,
    cargando2FA,
    manejarSeleccion,
    manejarAbrirPopUp,
    manejarCerrarPopUp,
    eliminarUsuarios,
    manejarVerificar2FA,
    manejarCerrarModal2FA,
  };
}