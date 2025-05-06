import { memo, useCallback } from 'react';
import { Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';

const CampoTextoForm = memo(
  ({ label, name, value, onChange, placeholder, type = 'text', multiline = false, rows = 1 }) => (
    <Grid size={6}>
      <CampoTexto
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        size='medium'
        required
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
      />
    </Grid>
  )
);

const CampoSelectForm = memo(
  ({ label, name, options, value, onChange, placeholder, helperText, size = 12 }) => (
    <Grid size={size}>
      <CampoSelect
        label={label}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        size='medium'
        required
        autoWidth
        placeholder={placeholder}
        helperText={helperText}
      />
    </Grid>
  )
);

const TituloForm = memo(({ titulo, tituloVariant, size = 12 }) => (
  <Grid size={size} overflow='hidden'>
    <Texto variant={tituloVariant} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const BotonForm = memo(({ selected, fullWidth, backgroundColor, outlineColor, label, onClick }) => (
  <Grid size={6} display='flex' alignItems='center' justifyContent='end'>
    <Boton
      variant='contained'
      selected={selected}
      fullWidth={fullWidth}
      color='primary'
      size='medium'
      backgroundColor={backgroundColor}
      outlineColor={outlineColor}
      label={label}
      onClick={onClick}
    />
  </Grid>
));

const CamposOpcion = memo(({ opcion, index, varianteId, onActualizarOpcion, onEliminarOpcion }) => {
  const handleOpcionChange = useCallback(
    (campo, valor) => {
      onActualizarOpcion(varianteId, index, campo, valor);
    },
    [varianteId, index, onActualizarOpcion]
  );

  const handleEliminar = useCallback(() => {
    onEliminarOpcion(varianteId, index);
  }, [varianteId, index, onEliminarOpcion]);

  return (
    <Grid container spacing={2}>
      <TituloForm
        titulo={`Opcion ${opcion.valorOpcion || index + 1}`}
        tituloVariant='h6'
        size={6}
      />
      <BotonForm label='Eliminar' onClick={handleEliminar} />
      <CampoTextoForm
        label='Cantidad'
        type='number'
        name={`cantidad-${varianteId}-${index}`}
        value={opcion.cantidad}
        onChange={(evento) => handleOpcionChange('cantidad', evento.target.value)}
      />
      <CampoTextoForm
        label='Valor Opción'
        name={`valorOpcion-${varianteId}-${index}`}
        value={opcion.valorOpcion}
        onChange={(evento) => handleOpcionChange('valorOpcion', evento.target.value)}
      />
      <CampoTextoForm
        label='SKU Automático'
        name={`SKUautomatico-${varianteId}-${index}`}
        value={opcion.SKUautomatico}
        onChange={(evento) => handleOpcionChange('SKUautomatico', evento.target.value)}
      />
      <CampoTextoForm
        label='SKU Comercial'
        name={`SKUcomercial-${varianteId}-${index}`}
        value={opcion.SKUcomercial}
        onChange={(evento) => handleOpcionChange('SKUcomercial', evento.target.value)}
      />
      <CampoTextoForm
        label='Costo Adicional'
        type='number'
        name={`costoAdicional-${varianteId}-${index}`}
        value={opcion.costoAdicional}
        onChange={(evento) => handleOpcionChange('costoAdicional', evento.target.value)}
      />
      <CampoTextoForm
        label='Descuento (%)'
        type='number'
        name={`descuento-${varianteId}-${index}`}
        value={opcion.descuento}
        onChange={(evento) => handleOpcionChange('descuento', evento.target.value)}
      />
      <CampoSelectForm
        label='Estado'
        name={`estado-${varianteId}-${index}`}
        options={[
          { value: 1, label: 'Activo' },
          { value: 0, label: 'Inactivo' },
        ]}
        value={opcion.estado}
        onChange={(evento) => handleOpcionChange('estado', evento.target.value)}
        size={6}
      />
    </Grid>
  );
});

export default CamposOpcion;
