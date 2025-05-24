import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, CircularProgress, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import Boton from '@Atomos/Boton';




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

const Verificar2FAModal = ({
  abierto,
  onCerrar,
  onConfirmar,
  cargando,
  error,
  codigo,
  setCodigo,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const manejarConfirmar = () => {
    onConfirmar(codigo);
  };

  return (
    <Modal open={abierto} onClose={onCerrar}>
      <Box sx={estiloModal}>
        <Typography variant="h6">Verificar en tu app de autenticación</Typography>

        <TextField
          label="Código 2FA"
          value={codigo || ''}
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2, 
          mt: 2,
        }}
      >
        <Boton
          label="Cancelar"
          variant="outlined"
          onClick={onCerrar}
          outlineColor={colores.altertex[1]}
        />

        <Boton
          label={cargando ? (
            <>
              Verificando... <CircularProgress size={16} sx={{ ml: 1 }} />
            </>
          ) : (
            'Verificar'
          )}
          variant="contained"
          onClick={manejarConfirmar}
          backgroundColor={colores.altertex[1]}
          disabled={cargando || String(codigo).length !== 6}
        />
      </Box>
      </Box>
    </Modal>
  );
};
export default Verificar2FAModal;