import React from 'react';
import PropTypes from 'prop-types';
import Texto from '@Atomos/Texto';
import { Grid, Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';

const CuotasInfo = ({
  nombre,
  periodoRenovacion,
  renovacionHabilitada,
  descripcion,
  ultimaActualizacion,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom sx={{ mb: 2, pb: 1 }}>
            <strong>Nombre:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {nombre || 'No especificado'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Descripción:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {descripcion || 'Sin descripción'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Periodo de Renovación:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {periodoRenovacion ?? 'No especificado'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Renovación Habilitada:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {renovacionHabilitada === 1 || renovacionHabilitada === true ? 'Sí' : 'No'}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Última Actualización:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {ultimaActualizacion ? new Date(ultimaActualizacion).toLocaleString() : 'N/A'}
            </span>
          </Texto>
        </Grid>
      </Grid>
    </Box>
  );
};

CuotasInfo.propTypes = {
  nombre: PropTypes.string,
  periodoRenovacion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renovacionHabilitada: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  descripcion: PropTypes.string,
  ultimaActualizacion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CuotasInfo;
