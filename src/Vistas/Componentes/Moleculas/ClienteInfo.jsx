import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme } from '@mui/material';
import Texto from '../atomos/Texto';
import Icono from '../atomos/Icono';

const InfoCliente = ({
  idCliente,
  nombreLegal,
  nombreVisible,
  empleados,
  usuariosAsignados,
  imagenURL,
}) => {
  const theme = useTheme();

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
            <a href={`#`} style={{ color: theme.palette.primary.main, fontWeight: 500, textDecoration: 'none'}}>
              {idCliente}
            </a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Nombre Legal:{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main, textDecoration: 'none'  }}>
              {nombreLegal}
            </a>
          </Texto>
          <Texto gutterBottom>
            Nombre visible:{' '}
            <span style={{ color: theme.palette.primary.main }}>{nombreVisible}</span>
          </Texto>
        </Grid>

        {/* Información adicional */}
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMACIÓN ADICIONAL</strong>{' '}
          </Texto>
          <Texto gutterBottom mb={4}>
            Usuarios asignados:{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              {usuariosAsignados}
            </a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Empleados:{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              {empleados}
            </a>
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
        {imagenURL && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              padding: 0.5,
            }}
          >
            <Icono nombre="ImageOutlined" color="white" size="large" />
          </Box>
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