import { Box } from "@mui/material";

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
