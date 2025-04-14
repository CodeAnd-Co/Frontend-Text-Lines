import { Box } from "@mui/material";

/**
 * Componente que renderiza una imagen de logo centrada horizontalmente.
 *
 * Este componente usa un contenedor `Box` con estilo flex para centrar la imagen
 * y mostrar un logo con dimensiones personalizables.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.logoSrc="/logo-altertex-inicio-sesion.png"] - Ruta de la imagen del logo.
 * @param {string} [props.altText="Logo"] - Texto alternativo para la imagen.
 * @param {string|number} [props.width="345px"] - Ancho del logo (puede ser en px, %, etc.).
 * @param {string|number} [props.height="80px"] - Alto del logo (puede ser en px, %, etc.).
 *
 * @returns {JSX.Element} Imagen del logo centrada dentro de un contenedor.
 */
const LogoImagen = ({ logoSrc, altText, width, height }) => {
  return (
    <Box display='flex' justifyContent='center' mb={1}>
      <img
        src={logoSrc || "/logo-altertex-inicio-sesion.png"}
        alt={altText || "Logo"}
        style={{ width: width || "345px", height: height || "80px" }}
      />
    </Box>
  );
};

export default LogoImagen;
