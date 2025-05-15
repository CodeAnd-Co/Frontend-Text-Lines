import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import GrupoBotones from '@Moleculas/GrupoBotones';
import { tokens } from '@SRC/theme';

const ModalLeerCliente = ({
  abierto,
  alCerrar,
  alConfirmar,
  titulo = 'Título',
  varianteTitulo = 'h6',
  etiquetaConfirmar = 'Guardar',
  etiquetaCancelar = 'Cancelar',
  botones = null,
  contenido,
  panelError = null,
}) => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const botonesPredeterminados = [
    {
      label: etiquetaCancelar,
      variant: 'outlined',
      onClick: alCerrar,
      outlineColor: colores.altertex[1],
    },
    {
      label: etiquetaConfirmar,
      variant: 'contained',
      onClick: alConfirmar,
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <Modal
      open={abierto}
      onClose={alCerrar}
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
          bgcolor: tema.palette.background.paper,
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
            variant={varianteTitulo}
            gutterBottom
            sx={{ color: tema.palette.text.primary }}
            mb={4}
          >
            {titulo}
          </Texto>
        )}

        {contenido}

        {panelError}

        <GrupoBotones
          buttons={botones ?? botonesPredeterminados}
          spacing={1}
          direction='row'
          align='end'
        />
      </Paper>
    </Modal>
  );
};

ModalLeerCliente.propTypes = {
  abierto: PropTypes.bool.isRequired,
  alCerrar: PropTypes.func.isRequired,
  alConfirmar: PropTypes.func.isRequired,
  titulo: PropTypes.string,
  varianteTitulo: PropTypes.string,
  etiquetaConfirmar: PropTypes.string,
  etiquetaCancelar: PropTypes.string,
  botones: PropTypes.array,
  contenido: PropTypes.node.isRequired,
  panelError: PropTypes.node,
};

export default ModalLeerCliente;
