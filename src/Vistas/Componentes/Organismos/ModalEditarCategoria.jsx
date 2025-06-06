import React, { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import CategoriaInfoEditable from '@Organismos/CategoriaInfoEditable';
import { tokens } from '@SRC/theme';

/**
 * Modal para editar una categoría existente.
 *
 * RF49 - Actualizar Categoría
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.abierto - Si el modal está abierto.
 * @param {function} props.onCerrar - Función para cerrar el modal.
 * @param {object} props.categoria - Detalle de la categoría (nombre, descripción, productos).
 * @param {function} props.onGuardar - Función a ejecutar al guardar los cambios.
 * @param {function} props.onCambioTransferencia - Función para manejar el cambio en los productos asociados.
 * @param {object} props.estadoActualizacion - Estado del proceso de actualización.
 * @param {function} props.setCategoria - Función para actualizar el estado local de la categoría.
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

  if (!categoria) return null;

  const { cargando, error, exitoso, mensaje, limpiarEstado } = estadoActualizacion;

  const manejarGuardar = () => {
    if (!categoria.nombreCategoria.trim()) {
      setErrorNombre(true);
      return;
    }

    setErrorNombre(false);
    onGuardar();
  };

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
        nombre={categoria.nombreCategoria}
        descripcion={categoria.descripcion}
        productosDisponibles={categoria.productosDisponibles}
        productosSeleccionados={categoria.productosSeleccionados}
        onCambioNombre={(evento) => {
          setCategoria({ ...categoria, nombreCategoria: evento.target.value });
          if (evento.target.value.trim()) setErrorNombre(false);
        }}
        onCambioDescripcion={(evento) =>
          setCategoria({ ...categoria, descripcion: evento.target.value })
        }
        onCambioTransferencia={onCambioTransferencia}
        deshabilitado={cargando}
        errorNombre={errorNombre}
      />

      {error && (
        <Box mt={3}>
          <Alerta tipo='error' mensaje={error} cerrable duracion={4000} onClose={limpiarEstado} />
        </Box>
      )}

      {exitoso && mensaje && (
        <Box mt={3}>
          <Alerta tipo='success' mensaje={mensaje} cerrable duracion={3000} onClose={limpiarEstado} />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4 }}>
        <Button
          variant='contained'
          onClick={manejarGuardar}
          disabled={cargando}
          sx={{ backgroundColor: colores.altertex[1], color: 'white' }}
        >
          GUARDAR
        </Button>
        <Button
          variant='outlined'
          onClick={onCerrar}
          disabled={cargando}
          sx={{ borderColor: colores.altertex[1], color: colores.altertex[1] }}
        >
          CANCELAR
        </Button>
      </Box>
    </ModalFlotante>
  );
};

export default ModalEditarCategoria;