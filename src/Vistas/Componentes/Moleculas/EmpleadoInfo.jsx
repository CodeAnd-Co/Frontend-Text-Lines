import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import Chip from '@Atomos/Chip';
import { tokens } from '@SRC/theme';

/**
 * Componente para mostrar la información detallada de un empleado
 */
const InfoEmpleado = ({
  nombreCompleto,
  correoElectronico,
  numeroEmergencia,
  areaTrabajo,
  posicion,
  cantidadPuntos,
  antiguedad,
  estadoEmpleado,
  idEmpleado,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        <Grid item xs={12} sm={6}>
          <Box display='flex' alignItems='center' gap={2} mb={2}>
            <Texto variant='h6' gutterBottom>
              <strong>Información del Empleado</strong>
            </Texto>

            {estadoEmpleado && (
              <Chip
                label={estadoEmpleado.label}
                color={estadoEmpleado.color || 'default'}
                shape={estadoEmpleado.shape || 'circular'}
                backgroundColor={estadoEmpleado.backgroundColor || theme.palette.background.default}
                size='small'
              />
            )}
          </Box>

          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Área de Trabajo:</strong>{' '}
            <span style={{ color: colores.altertex[2], fontWeight: 500 }}>
              {areaTrabajo || 'No especificada'}
            </span>
          </Texto>

          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Posición:</strong>{' '}
            <span style={{ color: colores.altertex[2], fontWeight: 500 }}>
              {posicion || 'No especificada'}
            </span>
          </Texto>

          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Antigüedad:</strong>{' '}
            <span style={{ color: colores.altertex[2], fontWeight: 500 }}>
              {antiguedad || 'No disponible'}
            </span>
          </Texto>

          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Puntos:</strong>{' '}
            <span style={{ color: colores.altertex[2], fontWeight: 500 }}>
              {cantidadPuntos || 0}
            </span>
          </Texto>
        </Grid>

        <Grid item xs={12} sm={6} />
      </Grid>

      <Grid container spacing={6} wrap='nowrap'>
        <Grid item xs>
          <Box sx={{ maxWidth: '100%' }}>
            <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 4 }}>
              INFORMACIÓN DE CONTACTO
            </Texto>
            <Texto gutterBottom sx={{ mb: 4 }}>
              Email:{' '}
              <span style={{ color: colores.altertex[2] }}>
                {correoElectronico || 'No disponible'}
              </span>
            </Texto>
            <Texto gutterBottom sx={{ mb: 4 }}>
              Teléfono de Emergencia:{' '}
              <span style={{ color: colores.altertex[2] }}>
                {numeroEmergencia || 'No disponible'}
              </span>
            </Texto>
          </Box>
        </Grid>

        <Grid item xs>
          <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 4 }}>
            DATOS REGISTRADOS
          </Texto>
          <Texto gutterBottom sx={{ mb: 4 }}>
            Nombre Completo:{' '}
            <span style={{ color: colores.altertex[2] }}>{nombreCompleto || 'No disponible'}</span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 4 }}>
            ID de Empleado:{' '}
            <span style={{ color: colores.altertex[2] }}>{idEmpleado || 'No disponible'}</span>
          </Texto>
        </Grid>
      </Grid>
    </Box>
  );
};

InfoEmpleado.propTypes = {
  nombreCompleto: PropTypes.string,
  correoElectronico: PropTypes.string,
  numeroEmergencia: PropTypes.string,
  areaTrabajo: PropTypes.string,
  posicion: PropTypes.string,
  cantidadPuntos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  antiguedad: PropTypes.string,
  estadoEmpleado: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    shape: PropTypes.oneOf(['cuadrada', 'circular']),
    backgroundColor: PropTypes.string,
  }),
  idEmpleado: PropTypes.string,
};

export default InfoEmpleado;
