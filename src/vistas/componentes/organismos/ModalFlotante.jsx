import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper } from '@mui/material';
import Texto from '../Atomos/Texto';
import GrupoBotones from '../moleculas/GrupoBotones';

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
  tituloVariant = 'h6',
  confirmLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  botones = null,
  children,
}) => {
  // Botones por defecto si no se proporcionan
  const defaultBotones = [
    { label: cancelLabel, variant: 'outlined', onClick: onClose },
    { label: confirmLabel, variant: 'contained', onClick: onConfirm },
  ];

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
          <Texto variant={tituloVariant} gutterBottom>
            {titulo}
          </Texto>
        )}

        {children}

        <GrupoBotones buttons={botones ?? defaultBotones} spacing={1} direction='row' align='end' />
      </Paper>
    </Modal>
  );
};

ModalFlotante.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  titulo: PropTypes.string,
  tituloVariant: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  botones: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default ModalFlotante;
