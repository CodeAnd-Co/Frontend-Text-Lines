import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme'; // ajusta la ruta según tu estructura

const Contenedor = ({ children, elevation = 1, background, borderLeft, sx = {}, ...props }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  return (
    <Paper
      elevation={elevation}
      sx={{
        backgroundColor: background || colores.menu[2],
        borderLeft: borderLeft ? `6px solid ${borderLeft}` : 'none',
        padding: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

Contenedor.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  background: PropTypes.string,
  borderLeft: PropTypes.string,
  sx: PropTypes.object,
};

export default Contenedor;
