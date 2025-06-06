import React from 'react';
import { Box } from '@mui/material';
import CampoTexto from '@Atomos/CampoTexto';
import ListaTransferencia from '@Organismos/ListaTransferencia';

const CategoriaInfoEditable = ({
  nombre,
  descripcion,
  productosDisponibles,
  productosSeleccionados,
  onCambioNombre,
  onCambioDescripcion,
  onCambioTransferencia,
  deshabilitado = false,
  errorNombre = false
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Fila de campos */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CampoTexto
              label='Nombre de la Categoría'
              name='nombreCategoria'
              value={nombre}
              onChange={onCambioNombre}
              fullWidth
              required
              maxLength={50}
              helperText={
                errorNombre
                  ? 'Este campo es obligatorio'
                  : `${nombre.length}/50 caracteres`
              }
              error={errorNombre}
              disabled={deshabilitado}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <CampoTexto
              label='Descripción'
              name='descripcionCategoria'
              value={descripcion}
              onChange={onCambioDescripcion}
              fullWidth
              maxLength={150}
              helperText={`${descripcion.length}/150 caracteres`}
              disabled={deshabilitado}
            />
          </Box>
        </Box>

        {/* Fila de lista de transferencia */}
        <Box>
          <ListaTransferencia
            elementosDisponibles={productosDisponibles}
            elementosSeleccionados={productosSeleccionados}
            alCambiarSeleccion={onCambioTransferencia}
            tituloIzquierda='Productos Disponibles'
            tituloDerecha='Productos Asociados'
            obtenerEtiquetaElemento={(producto) => producto.nombre}
            obtenerClaveElemento={(producto) => producto.id}
            alturaMaxima={300}
            deshabilitado={deshabilitado}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Exportar con React.memo para optimización
export default React.memo(CategoriaInfoEditable);