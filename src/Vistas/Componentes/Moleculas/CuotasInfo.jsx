import React from 'react';
import PropTypes from 'prop-types';
import Texto from '@Atomos/Texto';
import { Grid, Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import Tabla from '@Organismos/Tabla'; // Asegúrate de que la ruta sea correcta

const CuotasInfo = ({ nombre, descripcion, productos = [], cuotas = [] }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Combina productos y cuotas en filas para la tabla
  const rows = productos.map((producto, idx) => ({
    id: idx,
    nombreComun: producto.nombre,
    cuota_valor: cuotas[idx]?.valor ?? '',
  }));

  const columns = [
    { field: 'nombreComun', headerName: 'Producto', width: 200 },
    { field: 'cuota_valor', headerName: 'Valor de Cuota', width: 150 },
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
      <Tabla columns={columns} rows={rows} pageSize={5} loading={false} sx={{ mt: 2 }} />
    </Box>
  );
};

CuotasInfo.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  productos: PropTypes.array,
  cuotas: PropTypes.array,
};

export default CuotasInfo;
