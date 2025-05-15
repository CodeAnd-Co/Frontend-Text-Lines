import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import GrupoBotones from '@Moleculas/GrupoBotones';
import { tokens } from '@SRC/theme';

const ModalFlotante = ({
  open,
  onClose,
  onConfirm,
  titulo = 'Título',
  tituloVariant = 'h6',
  confirmLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  confirmDisabled = false,
  botones = null,
  children,
  customWidth,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const defaultBotones = [
    {
      label: cancelLabel,
      variant: 'outlined',
      onClick: onClose,
      outlineColor: colores.altertex[1],
    },
    { 
      label: confirmLabel,
      variant: 'contained',
      onClick: onConfirm,
      color: 'error',
      backgroundColor: colores.altertex[1],
      deshabilitado: confirmDisabled,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            backgroundColor: colores.acciones[2],
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
          boxShadow: 24,
          borderRadius: 2,
          padding: 3,
          outline: 'none',
          width: customWidth || 620,
        }}
      >
        {titulo && (
          <Texto variant={tituloVariant} gutterBottom sx={{ color: colores.texto[1] }} mb={3}>
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
  confirmDisabled: PropTypes.bool,
  botones: PropTypes.array,
  children: PropTypes.node.isRequired,
  customWidth: PropTypes.number,
};

export default ModalFlotante;
