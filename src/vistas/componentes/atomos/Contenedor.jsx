import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const Contenedor = ({
  children,
  elevation = 1,
  background = 'white',
  borderLeft,
  sx = {},
  ...props
}) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        backgroundColor: background,
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
