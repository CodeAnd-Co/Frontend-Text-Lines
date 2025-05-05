import React from 'react';
import { Box } from '@mui/material';
import TarjetaBasica from '@SRC/Vistas/Componentes/Moleculas/TarjetaBasica';
import { NumeroInput } from '@SRC/Vistas/Componentes/Atomos/NumeroInput';
import Switch from '@SRC/Vistas/Componentes/Atomos/Switch';

const TarjetaRenovacion = ({
  periodoRenovacion,
  setPeriodoRenovacion,
  renovacionActiva,
  setRenovacionActiva,
}) => {
  return (
    <TarjetaBasica tituloPrincipal='Configuración de Renovación' sx={{ margin: 3 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <div>
          <h3>Tiempo de renovación: </h3>
        </div>

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
