// RF5 - Eliminar Usuario -  https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

import { useState } from 'react';
import { RepositorioEliminarUsuarios } from '../../dominio/repositorios/Usuarios/repositorioEliminarUsuario';

/**
 * Hook para manejar la eliminación de usuarios
 * @param {function} onAlerta - Función para mostrar alertas
 * @param {function} onRecarga - Función para recargar datos después de eliminar
 * @returns {Object} - Funciones y estados para manejar la eliminación
 */
export function useEliminarUsuarios(onAlerta, onRecarga) {
  const [abrirPopUp, setAbrirPopUp] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [usuariosAEliminar, setUsuariosAEliminar] = useState({
    type: 'include',
    ids: new Set(),
    rol: new Set(),
  });

  const manejarSeleccion = (seleccionados) => {
    setUsuariosAEliminar((prev) => ({
      ...prev,
      ids: seleccionados.ids || new Set(),
      rol: seleccionados.rol || new Set(),
    }));
  };

  const manejarAbrirPopUp = () => {
    if (usuariosAEliminar.ids.size === 0) {
      onAlerta({
        tipo: 'error',
        mensaje: 'Por favor selecciona al menos un usuario para eliminar.',
      });
    } else if (usuariosAEliminar.rol.has('Super Administrador')) {
      onAlerta({
        tipo: 'error',
        mensaje: 'No puedes eliminar a un Super Administrador.',
      });
    } else {
      setAbrirPopUp(true);
    }
  };

  const manejarCerrarPopUp = () => {
    setAbrirPopUp(false);
  };

  const eliminarUsuarios = async () => {
    setCargando(true);
    try {
      const resultado = await RepositorioEliminarUsuarios.eliminarUsuarios(usuariosAEliminar);
      setAbrirPopUp(false);

      // Detectar éxito por el mensaje recibido
      const exito =
        resultado.mensaje && resultado.mensaje.toLowerCase().includes('eliminados correctamente');

      if (exito) {
        onAlerta({
          tipo: 'success',
          mensaje: 'Usuario(s) eliminado(s)  ',
        });
        setUsuariosAEliminar({ type: 'include', ids: new Set(), rol: new Set() });
        if (onRecarga) onRecarga();
      }

      return resultado;
    } catch (error) {
      onAlerta({
        tipo: 'error',
        mensaje: `Error al eliminar usuarios: ${error.message}`,
      });
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
    manejarSeleccion,
    manejarAbrirPopUp,
    manejarCerrarPopUp,
    eliminarUsuarios,
  };
}
