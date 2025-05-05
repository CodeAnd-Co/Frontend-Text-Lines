import { memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper } from '@mui/material';
import Texto from '../Atomos/Texto';
import GrupoBotones from '../Moleculas/GrupoBotones';
import { useMode, tokens } from '../../../theme';

const Titulo = memo(({ titulo, tituloVariant, theme }) => (
  <Texto variant={tituloVariant} gutterBottom sx={{ color: theme.palette.text }}>
    {titulo}
  </Texto>
));

const Botones = memo(({ botones, defaultBotones }) => (
  <GrupoBotones buttons={botones ?? defaultBotones} spacing={1} direction='row' align='end' />
));

const Contenedor = memo(({ titulo, tituloVariant, botones, children, theme, defaultBotones }) => (
  <Paper
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80vh',
      overflowY: 'auto',
      bgcolor: theme.palette.backgroundColor,
      boxShadow: 24,
      borderRadius: 2,
      padding: 3,
      outline: 'none',
      width: 620,
    }}
  >
    {titulo && <Titulo titulo={titulo} tituloVariant={tituloVariant} theme={theme} />}
    {children}
    <Botones botones={botones} defaultBotones={defaultBotones} />
  </Paper>
));

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
  const [theme] = useMode();
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      }}
    >
      <Contenedor
        titulo={titulo}
        tituloVariant={tituloVariant}
        botones={botones}
        children={children}
        theme={theme}
        defaultBotones={defaultBotones}
      />
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
