import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Icono from '@Atomos/Icono';
import Texto from '@Atomos/Texto';

const TarjetaAccion = ({
  icono,
  texto,
  onClick,
  sx = {},
  hoverScale = true,
  disabled = false,
  iconSize = 'large',
  textoVariant = 'button',
  tabIndex = 0,
  ...props
}) => {
  return (
    <Box
      role='button'
      tabIndex={tabIndex}
      onClick={!disabled ? onClick : undefined}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed',
        borderColor: 'primary.light',
        backgroundColor: 'primary.lighter',
        color: 'primary.main',
        borderRadius: 2,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
        padding: 2,
        '&:hover': !disabled && {
          backgroundColor: 'primary.light',
          ...(hoverScale && { transform: 'scale(1.03)' }),
        },
        ...sx,
      }}
      {...props}
    >
      {icono && <Icono nombre={icono} size={iconSize} />}
      {texto && (
        <Texto variant={textoVariant} sx={{ mt: 1 }}>
          {texto}
        </Texto>
      )}
    </Box>
  );
};

TarjetaAccion.propTypes = {
  icono: PropTypes.string,
  texto: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  hoverScale: PropTypes.bool,
  disabled: PropTypes.bool,
  iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
  textoVariant: PropTypes.string,
  tabIndex: PropTypes.number,
};

export default TarjetaAccion;