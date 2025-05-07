import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import Icono from '@Atomos/Icono';
import { tokens } from '@SRC/theme';

const InfoCliente = ({
  idCliente,
  nombreLegal,
  nombreVisible,
  empleados,
  usuariosAsignados,
  imagenURL,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        {/* Información principal */}
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMACIÓN</strong>{' '}
          </Texto>
          <Texto gutterBottom mb={4}>
            ID de Cliente:{' '}
            <a style={{ color: colores.primario[1], fontWeight: 500, textDecoration: 'none' }}>
              {idCliente}
            </a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Nombre Legal:{' '}
            <a style={{ color: colores.primario[1], textDecoration: 'none' }}>{nombreLegal}</a>
          </Texto>
          <Texto gutterBottom>
            Nombre visible: <span style={{ color: colores.primario[1] }}>{nombreVisible}</span>
          </Texto>
        </Grid>

        {/* Información adicional */}
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMACIÓN ADICIONAL</strong>{' '}
          </Texto>
          <Texto gutterBottom mb={4}>
            Usuarios asignados:{' '}
            <a style={{ color: colores.primario[1], textDecoration: 'none' }}>
              {usuariosAsignados}
            </a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Empleados:{' '}
            <a style={{ color: colores.primario[1], textDecoration: 'none' }}>{empleados}</a>
          </Texto>
        </Grid>
      </Grid>

      {/* Previsualización imagen */}
      <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
        PREVISUALIZAR IMAGEN
      </Texto>
      <Box
        sx={{
          maxWidth: '240px',
          height: '120px',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          position: 'relative',
        }}
      >
        <img
          src={imagenURL}
          alt='Previsualización'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: colores.acciones[3],
          }}
        />
        {imagenURL && (
          <Icono
            nombre='ImageOutlined'
            size='large'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

InfoCliente.propTypes = {
  idCliente: PropTypes.string.isRequired,
  nombreLegal: PropTypes.string.isRequired,
  nombreVisible: PropTypes.string.isRequired,
  empleados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  usuariosAsignados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imagenURL: PropTypes.string,
};

export default InfoCliente;
