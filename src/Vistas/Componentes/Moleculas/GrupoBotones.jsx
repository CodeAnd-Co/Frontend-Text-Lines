import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Boton from '@SRC/Vistas/Componentes/Atomos/Boton';

/** Molécula: grupo de botones */
const GrupoBotones = ({ buttons, spacing = 1, direction = 'row', align = 'center' }) => {
  return (
    <Stack
      direction={direction}
      spacing={spacing}
      alignItems={align}
      justifyContent={align}
      gap={2}
      flexWrap='wrap'
    >
      {buttons.map((btn, index) => (
        <Boton key={index} {...btn} />
      ))}
    </Stack>
  );
};

GrupoBotones.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
      selected: PropTypes.bool,
      fullWidth: PropTypes.bool,
      color: PropTypes.string,
      size: PropTypes.oneOf(['small', 'medium', 'large']),
      backgroundColor: PropTypes.string,
      outlineColor: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
  spacing: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'column']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
};

export default GrupoBotones;
