import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

const estiloModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
};

const Verificar2FAModal = ({ abierto, onCerrar, onConfirmar, cargando, error }) => {
  const [codigo, setCodigo] = useState('');

  const manejarConfirmar = () => {
    onConfirmar(codigo);
    setCodigo('');
  };

  return (
    <Modal open={abierto} onClose={onCerrar}>
      <Box sx={estiloModal}>
        <Typography variant="h6">Verificar en tu app de autenticación</Typography>

        <TextField
        label="Código 2FA"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))} 
        fullWidth
        slotProps={{
            maxLength: 6,
            inputMode: 'numeric',
            pattern: '[0-9]*',
        }}
        sx={{ mt: 2 }}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onCerrar} variant="outlined" sx={{ mr: 1 }}>Cancelar</Button>
          <Button
            onClick={manejarConfirmar}
            variant="contained"
            disabled={cargando || codigo.length !== 6}
          >
            {cargando ? <CircularProgress size={24} /> : 'Verificar'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Verificar2FAModal;