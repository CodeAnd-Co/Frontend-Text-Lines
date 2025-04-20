import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, Stack, Typography } from '@mui/material';
import Boton from '../atomos/Boton';

/**
 * Modal reutilizable para envolver cualquier formulario u organismo.
 *
 * Recibe:
 * - `open`: si el modal está visible
 * - `onClose`: función para cerrar el modal
 * - `onConfirm`: función al hacer clic en el botón principal
 * - `titulo`: título opcional del formulario
 * - `children`: el contenido interno (ej. formulario)
 */
const ModalFlotante = ({
  open,
  onClose,
  onConfirm,
  titulo = 'Título',
  confirmLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          padding: 3,
          outline: 'none',
          width: 620,
        }}
      >
        {titulo && (
          <Typography variant='h6' component='h2' gutterBottom>
            {titulo}
          </Typography>
        )}

        {children}

        <Stack spacing={1} direction='row' justifyContent='flex-end' mt={2}>
          <Boton variant='outlined' label={cancelLabel} onClick={onClose} />
          <Boton variant='contained' label={confirmLabel} onClick={onConfirm} />
        </Stack>
      </Paper>
    </Modal>
  );
};

ModalFlotante.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  titulo: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalFlotante;
