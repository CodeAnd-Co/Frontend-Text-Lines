import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const Cargador = ({ size = 40, thickness = 4, color = 'primary' }) => {
  return <CircularProgress size={size} thickness={thickness} color={color} />;
};

Cargador.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ]),
};

export default Cargador;
