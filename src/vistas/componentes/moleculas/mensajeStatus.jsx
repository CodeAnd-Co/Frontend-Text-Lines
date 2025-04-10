import { Typography } from "@mui/material";

const MensajeStatus = ({ message, isSuccess = false }) => {
  if (!message) return null;

  return (
    <Typography color={isSuccess ? "green" : "error"} textAlign='center' mt={1}>
      {message}
    </Typography>
  );
};

export default MensajeStatus;
