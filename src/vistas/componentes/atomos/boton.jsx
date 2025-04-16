import React from "react";
import PropTypes from "prop-types";
import { tokens } from '../../../theme';
import MUIButton from "@mui/material/Button";

/** Botón personalizado usando Material UI */
export const Boton = ({
  variant = "contained", // 'text' | 'contained' | 'outlined'
  selected = false,     // ¿Está el botón en estado "seleccionado"?
  fullWidth = false,    // ¿El botón ocupa todo el ancho del contenedor?
  color = "primary",    // 'primary', 'secondary', 'error', etc.
  size = "medium",      // 'small' | 'medium' | 'large'
  backgroundColor = null, // Color de fondo opcional
  label,                // Texto dentro del botón
  onClick,              // Función que se ejecuta al hacer clic
  ...props
}) => {
  // Estilo adicional si el botón está seleccionado
  const selectedStyle =
    selected && variant === "contained"
      ? {
          boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
          fontWeight: "bold",
        }
      : selected && variant === "outlined"
      ? {
          borderWidth: "2px",
          borderColor: "#1976d2",
          fontWeight: "bold",
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
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  /** ¿Está seleccionado (aplica estilo resaltado)? */
  selected: PropTypes.bool,
  /** ¿Ocupa todo el ancho del contenedor? */
  fullWidth: PropTypes.bool,
  /** Color del botón: 'primary', 'secondary', etc. */
  color: PropTypes.string,
  /** Tamaño del botón */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Color de fondo personalizado */
  backgroundColor: PropTypes.string,
  /** Texto del botón */
  label: PropTypes.string.isRequired,
  /** Función onClick */
  onClick: PropTypes.func,
};

export default Boton;