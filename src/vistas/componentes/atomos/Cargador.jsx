import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme'; // Asegúrate de que la ruta es correcta

const Cargador = ({ size = 40, thickness = 4, color = 'primary' }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode); // Accedemos a los tokens según el modo (claro/oscuro)

  // Verificamos si el color es uno de los colores predeterminados de MUI
  const muiColors = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'];

  const customColor = !muiColors.includes(color)
    ? colores[color]
      ? colores[color][500] || colores[color][0]
      : color
    : color;

  return <CircularProgress size={size} thickness={thickness} color={customColor} />;
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
