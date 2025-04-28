import { memo } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '../../Atomos/Texto';
import Icono from '../../Atomos/Icono';
import CampoTexto from '../../Atomos/CampoTexto';
import CampoSelect from '../../Atomos/CampoSelect';

const FormularioOpcion = memo(({ variantes, handleChange, estados, onEliminarOpcion }) => {
  return (
    <Grid container spacing={2}>
      <Grid item size={12}>
        <Box display='flex' alignItems='center'>
          <Texto variant='h6'>Opción de Variante</Texto>
          <Icono
            nombre='Cancel'
            color='error'
            clickable={true}
            tooltip='Eliminar Opción'
            onClick={onEliminarOpcion}
          />
        </Box>
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Cantidad'
          name='cantidad'
          value={variantes.cantidad || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa la cantidad de opciones disponibles'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Valor de la Opción'
          name='valorOpcion'
          value={variantes.valorOpcion || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el valor de la opción'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='SKU Automático'
          name='SKUautomatico'
          value={variantes.SKUautomatico || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Modifica el SKU Automático'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='SKU Comercial'
          name='SKUcomercial'
          value={variantes.SKUcomercial || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el SKU Comercial'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Costo Adicional'
          name='costoAdicional'
          value={variantes.costoAdicional || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el costo adicional'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Descuento (%)'
          name='descuento'
          value={variantes.descuento || ''}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ej: 10'
        />
      </Grid>

      <Grid item size={6}>
        <CampoSelect
          label='Estado'
          name='estado'
          value={variantes.estado || ''}
          onChange={handleChange}
          size='medium'
          options={estados}
          required
        />
      </Grid>
    </Grid>
  );
});

export default FormularioOpcion;
