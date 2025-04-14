import { TextField } from "@mui/material";

/**
 * Componente de campo de formulario basado en MUI TextField.
 *
 * @param {string} label - El texto de la etiqueta del campo.
 * @param {string} type - Tipo del campo (ej. 'text', 'password').
 * @param {string} value - Valor del campo.
 * @param {Function} onChange - Función para manejar el cambio del valor.
 * @param {boolean} [fullWidth=true] - Si el campo debe ocupar todo el ancho disponible.
 * @param {string} [variant='outlined'] - El estilo del campo.
 * @param {string} [margin='normal'] - El margen del campo.
 * @param {boolean} [required=false] - Si el campo es obligatorio.
 * @returns {JSX.Element} El campo de formulario de MUI.
 */

const CampoFormulario = ({
  label,
  type,
  value,
  onChange,
  fullWidth = true,
  variant = "outlined",
  margin = "normal",
  required = false,
  ...props
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      variant={variant}
      margin={margin}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
};

export default CampoFormulario;
