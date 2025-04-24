import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme'; // Asegúrate de que la ruta es correcta

const Texto = ({
  variant = 'body1',
  color = 'text.primary',
  align = 'inherit',
  gutterBottom = false,
  noWrap = false,
  children,
  ...props
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const colorFinal = color === 'text.primary' ? colores.texto[0] : color || colores.texto[0];

  return (
    <Typography
      variant={variant}
      color={colorFinal}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      {...props}
    >
      {children}
    </Typography>
  );
};

Texto.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'overline',
    'button',
    'inherit',
  ]),
  color: PropTypes.string,
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Texto;
