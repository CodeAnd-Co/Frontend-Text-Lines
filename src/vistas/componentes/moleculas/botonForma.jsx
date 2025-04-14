import { Button, CardActions } from "@mui/material";

/**
 * Componente de botón personalizado que utiliza Material UI.
 *
 * Este componente renderiza un botón dentro de un `CardActions` de Material UI.
 * Permite personalizar varias propiedades del botón como el tipo, el estilo y el contenido.
 *
 * @component
 * @param {Object} props - Propiedades que se pasan al componente.
 * @param {string} [props.type="submit"] - Tipo del botón. El valor por defecto es "submit".
 * @param {string} [props.variant="contained"] - Variante del botón. El valor por defecto es "contained".
 * @param {boolean} [props.fullWidth=true] - Si el botón debe ocupar todo el ancho disponible. El valor por defecto es `true`.
 * @param {React.ReactNode} props.children - El contenido que se renderiza dentro del botón (generalmente texto o elementos).
 * @param {Object} [props.sx={}] - Estilos adicionales para aplicar al contenedor y al botón. Utiliza el sistema de `sx` de Material UI.
 * @param {Object} [props] - Otras propiedades adicionales que se pasan directamente al componente `Button`.
 *
 * @returns {JSX.Element} El botón renderizado dentro de `CardActions`.
 */
const BotonForma = ({
  type = "submit",
  variant = "contained",
  fullWidth = true,
  children,
  sx = {},
  ...props
}) => {
  return (
    <CardActions sx={{ mt: 3, ...sx }}>
      <Button
        type={type}
        variant={variant}
        fullWidth={fullWidth}
        sx={{ mt: 2, ...sx }}
        {...props}
      >
        {children}
      </Button>
    </CardActions>
  );
};

export default BotonForma;
