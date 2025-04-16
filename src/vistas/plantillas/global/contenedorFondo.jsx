import { Box } from "@mui/material";

/**
 * Componente de contenedor con fondo personalizado.
 *
 * Este componente envuelve a los elementos hijos (`children`) en un contenedor que tiene
 * un fondo de imagen configurable, con estilos que lo ajustan a la pantalla completa.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos que se renderizan dentro del contenedor.
 * @param {string} [props.backgroundUrl="/fondo-inicio-sesion.png"] - URL de la imagen de fondo. El valor por defecto es una imagen de fondo de inicio de sesión.
 * @param {Object} [props.sx] - Estilos adicionales que se aplican al contenedor.
 *
 * @returns {JSX.Element} Un contenedor con fondo de imagen y los elementos hijos.
 */
const ContenedorFondo = ({
  children,
  backgroundUrl = "/fondo-inicio-sesion.png",
  ...props
}) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100%'
      sx={{
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        width: "100%",
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContenedorFondo;
