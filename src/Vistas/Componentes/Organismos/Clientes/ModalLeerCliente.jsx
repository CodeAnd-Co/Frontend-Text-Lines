import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import GrupoBotones from '@Moleculas/GrupoBotones';
import { tokens } from '@SRC/theme';

const ModalLeerCliente = ({
  open,
  onClose,
  onConfirm,
  titulo = 'Título',
  tituloVariant = 'h6',
  confirmLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  botones = null,
  children,
  errorPanel = null, // Nuevo prop para el panel de error
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
      backgroundColor: colores.altertex[1],
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
            backgroundColor: colores.acciones[1],
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
          bgcolor: theme.palette.background.paper,
          boxShadow: 24,
          borderRadius: 2,
          padding: 3,
          outline: 'none',
          minWidth: '700px',
          maxWidth: '700px',
        }}
      >
        {titulo && (
          <Texto
            variant={tituloVariant}
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
            mb={4}
          >
            {titulo}
          </Texto>
        )}

        {children}

        {/* Panel de error arriba de los botones */}
        {errorPanel}

        <GrupoBotones buttons={botones ?? defaultBotones} spacing={1} direction='row' align='end' />
      </Paper>
    </Modal>
  );
};

ModalLeerCliente.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  titulo: PropTypes.string,
  tituloVariant: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  botones: PropTypes.array,
  children: PropTypes.node.isRequired,
  errorPanel: PropTypes.node, // Nuevo prop
};

export default ModalLeerCliente;
