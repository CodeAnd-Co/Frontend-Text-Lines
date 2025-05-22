import React from 'react';
import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';

const estiloModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  padding: 4,
  borderRadius: 2,
};

const Activar2FAModal = ({ abierto, onCerrar, qrCode, cargando, error }) => (
  <Modal open={abierto} onClose={onCerrar}>
    <Box sx={estiloModal}>
      <Typography variant="h6">Activación de 2FA</Typography>

      {cargando ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      ) : qrCode ? (
        <>
          <img src={qrCode} alt="QR Code 2FA" style={{ width: '100%', marginTop: 16 }} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Escanea este código en Google Authenticator.
          </Typography>
        </>
      ) : (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Haz clic en activar para generar tu QR.
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onCerrar} variant="outlined">
          Cerrar
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default Activar2FAModal;