import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import MUIButton from '@mui/material/Button';
import { tokens } from '../../../theme';

const Boton = ({
  variant = 'contained',
  selected = false,
  fullWidth = false,
  color = 'primary',
  size = 'medium',
  backgroundColor = null,
  outlineColor = null,
  label,
  onClick,
  ...props
}) => {
<<<<<<< HEAD
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const outlinedStyle =
    variant === 'outlined' && outlineColor
=======
  const tema = useTheme();
  const colors = tokens(tema.palette.mode);
  // Estilo para outlined personalizado
  const outlinedStyle
    = variant === 'outlined' && outlineColor
>>>>>>> db0aaf0ec49dd396c3caf3ae25be1ffb28d85054
      ? {
          border: `1.5px solid ${outlineColor}`,
          color: outlineColor,
        }
      : {};

<<<<<<< HEAD
  const selectedStyle =
    selected && variant === 'contained'
=======
  // Estilo adicional si el botón está seleccionado
  const selectedStyle
    = selected && variant === 'contained'
>>>>>>> db0aaf0ec49dd396c3caf3ae25be1ffb28d85054
      ? {
          backgroundColor: colors.altertex[2],
          color: colors.primario[4],
        }
      : selected && variant === 'outlined'
      ? {
          backgroundColor: colors.altertex[3],
          color: colors.altertex[1],
        }
      : {};

  return (
    <MUIButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      sx={{
        backgroundColor: backgroundColor || undefined,
        ...outlinedStyle,
        ...selectedStyle,
      }}
      onClick={onClick}
      {...props}
    >
      {label}
    </MUIButton>
  );
};

Boton.propTypes = {
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
  selected: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  backgroundColor: PropTypes.string,
  outlineColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Boton;
