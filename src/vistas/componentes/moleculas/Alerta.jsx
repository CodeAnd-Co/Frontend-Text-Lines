import React from 'react';
import PropTypes from 'prop-types';
import Contenedor from '../Atomos/Contenedor';

import Icono from '../Atomos/Icono';
import Texto from '../Atomos/Texto';

const Alerta = ({
  tipo = 'info',
  mensaje,
  icono = true,
  iconoNombre,
  textoVariant = 'body1',
  textoColor,
  ...props
}) => {
  const coloresPorTipo = {
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  };

  const iconosPorTipo = {
    info: 'Info',
    success: 'CheckCircle',
    warning: 'Warning',
    error: 'Error',
  };

  const colorFondo = `${coloresPorTipo[tipo]}20`;
  const colorPrincipal = coloresPorTipo[tipo];
  const iconoMostrar = iconoNombre || iconosPorTipo[tipo];

  return (
    <Contenedor
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        backgroundColor: colorFondo,
        borderLeft: `6px solid ${colorPrincipal}`,
        ...props.sx,
      }}
    >
      {icono && (
        <Icono nombre={iconoMostrar} color={colorPrincipal} size='medium' variant='filled' />
      )}
      <Texto variant={textoVariant} color={textoColor || colorPrincipal}>
        {mensaje}
      </Texto>
    </Contenedor>
  );
};

Alerta.propTypes = {
  tipo: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  mensaje: PropTypes.string.isRequired,
  icono: PropTypes.bool,
  iconoNombre: PropTypes.string,
  textoVariant: PropTypes.string,
  textoColor: PropTypes.string,
};

export default Alerta;
