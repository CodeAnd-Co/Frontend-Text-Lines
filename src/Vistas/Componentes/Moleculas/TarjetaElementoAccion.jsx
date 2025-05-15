import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Icono from '@Atomos/Icono';
import Texto from '@Atomos/Texto';

const TarjetaElementoAccion = ({
  icono,
  texto,
  onEliminar,
  tooltipEliminar = 'Eliminar',
  sx = {},
  borderColor = 'primary.light',
  backgroundColor = 'primary.lighter',
  iconColor = 'primary',
  iconSize = 'large',
  textoVariant = 'caption',
  tabIndex = 0,
  disabled = false,
  ...props
}) => {
  return (
    <Box
      role='group'
      tabIndex={tabIndex}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px dashed',
        borderColor,
        backgroundColor,
        borderRadius: 2,
        padding: 2,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        ...sx,
      }}
      {...props}
    >
      <Box display='flex' alignItems='center' gap={1.5}>
        {icono && <Icono nombre={icono} size={iconSize} color={iconColor} />}
        {texto && (
          <Texto
            variant={textoVariant}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100px',
              display: 'block',
            }}
          >
            {texto}
          </Texto>
        )}
      </Box>
      {!disabled && onEliminar && (
        <Icono
          nombre='Cancel'
          size='small'
          color='error'
          clickable
          tooltip={tooltipEliminar}
          onClick={onEliminar}
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'red' },
          }}
        />
      )}
    </Box>
  );
};

TarjetaElementoAccion.propTypes = {
  icono: PropTypes.string,
  texto: PropTypes.string,
  onEliminar: PropTypes.func,
  tooltipEliminar: PropTypes.string,
  sx: PropTypes.object,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
  textoVariant: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
};

export default TarjetaElementoAccion;