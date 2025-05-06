import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import Chip from '@Atomos/Chip';
import Switch from '@mui/material';

const InfoEvento = ({
  modoEdicion = false,
  nombre,
  descripcion,
  puntos,
  periodoRenovacion,
  renovacion,
  estatus,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        <Grid item xs={12} sm={6}>
          <Box display='flex' alignItems='center' gap={25} mb={2}>
            <Texto gutterBottom>
              <strong>Nombre:</strong>{' '}
              <span style={{ color: theme.palette.primary.main, fontWeight: 500 }}>{nombre}</span>
            </Texto>

            {estatus && (
              <Chip
                label={estatus.label}
                color={estatus.color || 'default'}
                shape={estatus.shape || 'cuadrada'}
                backgroundColor={estatus.backgroundColor || theme.palette.background.default}
                size='small'
              />
            )}
          </Box>

          <Box sx={{ maxWidth: 220 }}>
            <CampoTexto
              label='Descripción'
              name='descripcion'
              value={descripcion}
              onChange={() => {}}
              fullWidth
              required
              error={false}
              helperText=''
              disabled={!modoEdicion}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} />
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CampoTexto
            label='Puntos'
            name='puntos'
            value={puntos}
            onChange={() => {}}
            fullWidth
            required
            error={false}
            helperText=''
            disabled={!modoEdicion}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CampoTexto
            label='Periodo de Renovación'
            name='periodoRenovacion'
            value={periodoRenovacion}
            onChange={() => {}}
            fullWidth
            required
            error={false}
            helperText=''
            disabled={!modoEdicion}
          />
        </Grid>
      </Grid>
      <Box display='flex' alignItems='center' gap={25} mt={2}>
        <Texto gutterBottom>
          <strong>Renovación:</strong>{' '}
          <span style={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            {renovacion === 1 ? 'Si' : 'No'}
          </span>
        </Texto>
        <Box sx={{ maxWidth: 220 }}>
          <CampoSelect
            label='Estatus'
            name='estatus'
            value={estatus}
            onChange={() => {}}
            options={[
              { value: 'Activo', label: 'Activo' },
              { value: 'Inactivo', label: 'Inactivo' },
            ]}
            fullWidth
            required
            error={false}
            helperText=''
            disabled={!modoEdicion}
          />
        </Box>
      </Box>

      <Box mt={2}>
        <Switch
          checked={renovacion === 1 ? true : false}
          onChange={() => {}}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </Box>
  );
};
