import React from 'react';
import { Box, Typography } from '@mui/material';
import TarjetaBasica from '../moleculas/TarjetaBasica';
import { NumeroInput } from '../atomos/NumeroInput';
import Switch from '../atomos/Switch';

const TarjetaRenovacion = ({
  periodoRenovacion,
  setPeriodoRenovacion,
  renovacionActiva,
  setRenovacionActiva,
}) => {
  return (
    <TarjetaBasica tituloPrincipal='Configuración de Renovación' sx={{ margin: 3 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {/* Título a la izquierda */}
        <div>
          <h3>Tiempo de renovación: </h3>
        </div>

        {/* Controles a la derecha */}
        <Box display='flex' alignItems='center' gap={1} sx={{ margin: 2 }}>
          <NumeroInput
            label='Meses'
            value={periodoRenovacion}
            onChange={(evento) => setPeriodoRenovacion(parseInt(evento.target.value, 10))}
            min={1}
            width={100}
          />
        </Box>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            gap: '16px',
          }}
        >
          {/* Texto + input de meses */}

          {/* Switch */}
          <Box display='flex' alignItems='center'>
            <Switch
              label='Renovación activa'
              checked={renovacionActiva}
              onChange={(evento) => setRenovacionActiva(evento.target.checked)}
              size='medium'
            />
          </Box>
        </div>
      </Box>
    </TarjetaBasica>
  );
};

export default TarjetaRenovacion;
