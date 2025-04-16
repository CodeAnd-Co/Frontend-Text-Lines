import React from 'react';
import { Button, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

/**
 * Componente Boton
 *
 * Este componente representa un boton estilizado utilizando Material UI.
 * Permite personalizar el color de fondo y el comportamiento al hacer clic.
 */

const Boton = ({ onClick, children }) => {
  const theme = useTheme(); // Obtiene el tema actual (claro u oscuro)
  const colors = tokens(theme.palette.mode); // Genera los colores basados en el modo del tema

  return (
    <Button
      variant='contained'
      onClick={onClick}
      sx={{
        backgroundColor: colors.primario[1], // Color de fondo principal del boton
        '&:hover': {
          backgroundColor: colors.primario[2], // Color de fondo al pasar el mouse
        },
      }}
    >
      {children}
    </Button>
  );
};

export default Boton;
