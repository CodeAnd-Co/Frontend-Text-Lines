import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

const MensajeStatus = ({ mensaje, esExito = false }) => {
  // Agregar una clave única para asegurar que el componente detecte cambios
  const [key, setKey] = useState(0);
  const [visibleMessage, setVisibleMessage] = useState(mensaje);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Cuando llega un nuevo mensaje, reseteamos el estado e incrementamos la clave
    if (mensaje) {
      setKey((prevKey) => prevKey + 1);
      setVisibleMessage(mensaje);
      setFading(false);

      const fadeTimer = setTimeout(() => {
        setFading(true);
      }, 1000);

      const removeTimer = setTimeout(() => {
        setVisibleMessage(null);
      }, 2000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [mensaje]);

  if (!visibleMessage) return null;

  return (
    <Typography
      key={key} // Forzar re-renderizado cuando cambia el key
      color={esExito ? "green" : "error"}
      textAlign='center'
      mt={1}
      sx={{
        transition: "opacity 1s ease-out",
        opacity: fading ? 0 : 1,
      }}
    >
      {visibleMessage}
    </Typography>
  );
};

export default MensajeStatus;
