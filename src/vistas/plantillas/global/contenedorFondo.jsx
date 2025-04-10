import { Box } from "@mui/material";

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
