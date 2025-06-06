import React, { useState, useCallback } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import CategoriaInfoEditable from '@Organismos/CategoriaInfoEditable';
import { tokens } from '@SRC/theme';

/**
 * Modal para editar una categoría existente.
 *
 * RF49 - Actualizar Categoría
 */
const ModalEditarCategoria = ({
  abierto,
  onCerrar,
  categoria,
  onGuardar,
  onCambioTransferencia,
  estadoActualizacion,
  setCategoria,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const [errorNombre, setErrorNombre] = useState(false);

  // Funciones memoizadas para evitar re-renders
  const manejarCambioNombre = useCallback((evento) => {
    const nuevoNombre = evento.target.value;
    setCategoria(prev => ({
      ...prev,
      nombreCategoria: nuevoNombre
    }));
    if (nuevoNombre.trim()) {
      setErrorNombre(false);
    }
  }, [setCategoria]);

  const manejarCambioDescripcion = useCallback((evento) => {
    const nuevaDescripcion = evento.target.value;
    setCategoria(prev => ({
      ...prev,
      descripcion: nuevaDescripcion
    }));
  }, [setCategoria]);

  const manejarGuardar = useCallback(() => {
    if (!categoria?.nombreCategoria?.trim()) {
      setErrorNombre(true);
      return;
    }
    setErrorNombre(false);
    onGuardar();
  }, [categoria?.nombreCategoria, onGuardar]);

  if (!categoria) return null;

  const { cargando, error, exitoso, mensaje, limpiarEstado } = estadoActualizacion || {};

  return (
    <ModalFlotante
      open={abierto}
      onClose={onCerrar}
      onConfirm={manejarGuardar}
      titulo='Editar Categoría'
      tituloVariant='h4'
      customWidth={900}
      botones={[]}
    >
      <CategoriaInfoEditable
        nombre={categoria.nombreCategoria || ''}
        descripcion={categoria.descripcion || ''}
        productosDisponibles={categoria.productosDisponibles || []}
        productosSeleccionados={categoria.productosSeleccionados || []}
        onCambioNombre={manejarCambioNombre}
        onCambioDescripcion={manejarCambioDescripcion}
        onCambioTransferencia={onCambioTransferencia}
        deshabilitado={cargando || false}
        errorNombre={errorNombre}
      />

      {error && (
        <Box mt={3}>
          <Alerta 
            tipo='error' 
            mensaje={error} 
            cerrable 
            duracion={4000} 
            onClose={limpiarEstado} 
          />
        </Box>
      )}

      {exitoso && mensaje && (
        <Box mt={3}>
          <Alerta 
            tipo='success' 
            mensaje={mensaje} 
            cerrable 
            duracion={3000} 
            onClose={limpiarEstado} 
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4 }}>
        <Button
          variant='contained'
          onClick={manejarGuardar}
          disabled={cargando}
          sx={{ 
            backgroundColor: colores.altertex[1], 
            color: 'white' 
          }}
        >
          GUARDAR
        </Button>
        <Button
          variant='outlined'
          onClick={onCerrar}
          disabled={cargando}
          sx={{ 
            borderColor: colores.altertex[1], 
            color: colores.altertex[1] 
          }}
        >
          CANCELAR
        </Button>
      </Box>
    </ModalFlotante>
  );
};

export default ModalEditarCategoria;