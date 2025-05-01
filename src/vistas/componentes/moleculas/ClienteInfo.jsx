import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme } from '@mui/material';
import Texto from '../atomos/Texto';
import Chip from '../atomos/Chip';

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
          <Texto gutterBottom>
            ID de Cliente:{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main, fontWeight: 500, textDecoration: 'none' }}>
              {idCliente}
            </a>
          </Texto>
          <Texto gutterBottom>
            <strong>Nombre Legal:</strong>{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main, textDecoration: 'none'  }}>
              {nombreLegal}
            </a>
          </Texto>
          <Texto gutterBottom>
            <strong>Nombre visible:</strong>{' '}
            <span style={{ color: theme.palette.primary.main }}>{nombreVisible}</span>
          </Texto>
        </Grid>

        {/* Información adicional */}
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom>
            <strong>Usuarios asignados:</strong>{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main }}>
              {usuariosAsignados}
            </a>
          </Texto>
          <Texto gutterBottom>
            <strong>Empleados:</strong>{' '}
            <a href={`#`} style={{ color: theme.palette.primary.main }}>
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
          width: '240px',
          height: '120px',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <img
          src={imagenURL}
          alt='Previsualización'
          style={{ width: '100%', objectFit: 'cover' }}
        />
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