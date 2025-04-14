import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

/**
 * Componente que muestra un mensaje de estado con un efecto de desvanecimiento.
 *
 * @param {string} mensaje - El mensaje que se mostrará en la interfaz.
 * @param {boolean} esExito - Si es `true`, el mensaje se mostrará en verde (éxito). Si es `false`, en rojo (error).
 * @returns {JSX.Element|null} El mensaje de estado con transiciones de opacidad.
 */

const MensajeStatus = ({ mensaje, esExito = false }) => {
  // Agregar una clave única para asegurar que el componente detecte cambios
  const [llave, setLlave] = useState(0);
  const [mensajeVisible, setMensajeVisible] = useState(mensaje);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Cuando llega un nuevo mensaje, reseteamos el estado e incrementamos la clave
    if (mensaje) {
      setLlave((llaveAnterior) => llaveAnterior + 1);
      setMensajeVisible(mensaje);
      setFading(false);

      const fadeTemporizador = setTimeout(() => {
        setFading(true);
      }, 1000);

      const removerTemporizador = setTimeout(() => {
        setMensajeVisible(null);
      }, 2000);

      return () => {
        clearTimeout(fadeTemporizador);
        clearTimeout(removerTemporizador);
      };
    }
  }, [mensaje]);

  if (!mensajeVisible) return null;

  return (
    <Typography
      key={llave} // Forzar re-renderizado cuando cambia el key
      color={esExito ? "green" : "error"}
      textAlign='center'
      mt={1}
      sx={{
        transition: "opacity 1s ease-out",
        opacity: fading ? 0 : 1,
      }}
    >
      {mensajeVisible}
    </Typography>
  );
};

export default MensajeStatus;
