import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

// Componente estilizado con animación de fade-out
const DifuminarMensaje = styled(Typography)(({ theme, fading }) => ({
  textAlign: "center",
  marginTop: theme.spacing(1),
  transition: "opacity 1s ease-out",
  opacity: fading ? 0 : 1,
}));

const MensajeStatus = ({ mensaje, esExito = false }) => {
  const [mensajeVisible, setMensajeVisible] = useState(mensaje);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Cuando cambia el mensaje, actualizamos el estado visible y reiniciamos el fade
    setMensajeVisible(mensaje);
    setFading(false);

    // Si hay un mensaje, configuramos la secuencia de disipación
    if (mensaje) {
      // Primero esperamos 4 segundos antes de comenzar a desvanecer
      const fadeTimer = setTimeout(() => {
        setFading(true); // Comienza el efecto de fade-out
      }, 4000); // 4 segundos antes de comenzar a desvanecer

      // Luego esperamos 1 segundo más para la animación y eliminamos el mensaje
      const removeTimer = setTimeout(() => {
        setMensajeVisible(null);
      }, 5000); // 5 segundos en total

      // Limpiamos ambos temporizadores si es necesario
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [mensaje]); // Efecto se ejecuta cuando cambia el mensaje

  if (!mensajeVisible) return null;

  return (
    <DifuminarMensaje color={esExito ? "green" : "error"} fading={fading}>
      {mensajeVisible}
    </DifuminarMensaje>
  );
};

export default MensajeStatus;
