import React from 'react';
import PropTypes from 'prop-types';
import Texto from '@Atomos/Texto';
import { Grid, Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';

const InfoEvento = ({ descripcion, puntos, periodoRenovacion, renovacion }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const renovacionEtiqueta = renovacion === 1 ? 'Si' : 'No';

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        <Grid xs={12} sm={6}>
          <Box display='flex' alignItems='center' gap={25} mb={2}>
            <Texto variant='h6' gutterBottom>
              <strong>Información del Evento</strong>
            </Texto>
          </Box>
          <Texto gutterBottom sx={{ mb: 2, pb: 1 }}>
            {descripcion || 'No especificada'}
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Puntos:</strong>{' '}
            <span style={{ color: colores.altertex[3], fontWeight: 500 }}>
              {puntos || 'No especificado'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Periodo de Renovación:</strong>{' '}
            <span style={{ color: colores.altertex[3], fontWeight: 500 }}>
              {periodoRenovacion || 'No especificado'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Renovación:</strong>{' '}
            <span style={{ color: colores.altertex[3], fontWeight: 500 }}>
              {renovacionEtiqueta || 'No especificado'}
            </span>
          </Texto>
        </Grid>
      </Grid>
    </Box>
  );
};

InfoEvento.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  puntos: PropTypes.number,
  periodoRenovacion: PropTypes.string,
  renovacion: PropTypes.bool,
};

export default InfoEvento;
