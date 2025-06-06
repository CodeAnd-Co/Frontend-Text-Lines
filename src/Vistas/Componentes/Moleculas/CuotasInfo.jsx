import React from 'react';
import PropTypes from 'prop-types';
import Texto from '@Atomos/Texto';
import { Grid, Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import Tabla from '@Organismos/Tabla';

const CuotasInfo = ({ descripcion, productos = [], cuotas = [] }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const rows = productos.map((producto, idx) => ({
    id: idx,
    nombreComun: producto.nombre,
    cuotaValor: cuotas[idx]?.valor ?? '',
  }));

  const columns = [
    { field: 'nombreComun', headerName: 'Producto', width: 200 },
    {
      field: 'cuotaValor',
      headerName: 'Valor de Cuota',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        <Grid item xs={12} sm={6}>
          <Texto gutterBottom sx={{ mb: 2 }}>
            <strong>Descripción:</strong>{' '}
            <span style={{ color: colores.altertex[4], fontWeight: 500 }}>
              {descripcion || 'Sin descripción'}
            </span>
          </Texto>
        </Grid>
      </Grid>
      <Tabla columns={columns} rows={rows} pageSize={5} />
    </Box>
  );
};

CuotasInfo.propTypes = {
  descripcion: PropTypes.string,
  productos: PropTypes.array,
  cuotas: PropTypes.array,
};

export default CuotasInfo;
