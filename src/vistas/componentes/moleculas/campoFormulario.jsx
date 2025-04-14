import { TextField } from "@mui/material";

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
