// RF48 Actualizar Categoría - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48
import { useState } from 'react';
import { RepositorioActualizarCategoria } from '@Repositorios/Categorias/repositorioActualizarCategoria';

export function useActualizarCategoria() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const actualizar = async (idCategoria, cambios) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
    const respuesta = await RepositorioActualizarCategoria.actualizar(idCategoria, cambios);
    setMensaje(respuesta.mensaje || 'Categoría actualizada correctamente');
    return true;
    } catch (err) {
    setError(err.message || 'Ocurrió un error al actualizar');
    return false;
    } finally {
    setCargando(false);
    }
  };

  return { actualizar, cargando, error, mensaje };
}