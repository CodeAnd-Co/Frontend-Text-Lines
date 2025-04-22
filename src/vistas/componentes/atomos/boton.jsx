import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from '@mui/material/Button';
import { tokens } from '../../../theme';

/** Botón personalizado usando Material UI */
const Boton = ({
  variant = 'contained', // 'text' | 'contained' | 'outlined'
  selected = false, // ¿Está el botón en estado "seleccionado"?
  fullWidth = false, // ¿El botón ocupa todo el ancho del contenedor?
  color = 'primary', // 'primary', 'secondary', 'error', etc.
  size = 'medium', // 'small' | 'medium' | 'large'
  backgroundColor = null, // Color de fondo opcional
  outlineColor = null, // Color de outline opcional
  label, // Texto dentro del botón
  onClick, // Función que se ejecuta al hacer clic
  ...props
}) => {
  const tema = themeSettings(theme.palette.mode);
  const colores = tokens(tema.palette.mode);
  // Estilo para outlined personalizado
  const outlinedStyle =
    variant === 'outlined' && outlineColor
      ? {
          border: `1.5px solid ${outlineColor}`,
          color: outlineColor,
        }
      : {};

  // Estilo adicional si el botón está seleccionado
  const selectedStyle =
    selected && variant === 'contained'
      ? {
          backgroundColor: colores.altertex[3], // azul con 70% opacidad
          color: colores.menu[2], // asegura contraste del texto
        }
      : selected && variant === 'outlined'
      ? {
          backgroundColor: colores.altertex[2], // azul con 50% opacidad
          color: colores.altertex[1],
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
  /** Tipo de botón: 'text', 'contained', 'outlined' */
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
  /** ¿Está seleccionado (aplica estilo resaltado)? */
  selected: PropTypes.bool,
  /** ¿Ocupa todo el ancho del contenedor? */
  fullWidth: PropTypes.bool,
  /** Color del botón: 'primary', 'secondary', etc. */
  color: PropTypes.string,
  /** Tamaño del botón */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Color de fondo personalizado */
  backgroundColor: PropTypes.string,
  /** Color de borde personalizado (solo para 'outlined') */
  outlineColor: PropTypes.string,
  /** Texto del botón */
  label: PropTypes.string.isRequired,
  /** Función onClick */
  onClick: PropTypes.func,
};

export default Boton;
