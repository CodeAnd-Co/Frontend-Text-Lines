//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo, useCallback } from 'react';
import { Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';

const CampoTextoForm = memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    helperText,
    type = 'text',
    multiline = false,
    rows = 1,
    error,
    required = true,
  }) => (
    <Grid size={6}>
      <CampoTexto
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        size='medium'
        required={required}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        error={Boolean(error)}
        helperText={helperText}
      />
    </Grid>
  )
);

const CampoSelectForm = memo(
  ({ label, name, options, value, onChange, placeholder, helperText, error, size = 12, required = true }) => (
    <Grid size={size}>
      <CampoSelect
        label={label}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        size='medium'
        required={required}
        autoWidth
        placeholder={placeholder}
        helperText={helperText}
        error={Boolean(error)}
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

const CamposOpcion = memo(
  ({ opcion, index, varianteId, erroresOpciones,  alActualizarOpcion, alEliminarOpcion }) => {
    const manejarActualizarOpcion = useCallback(
      (campo, valor) => {
        alActualizarOpcion(varianteId, index, campo, valor);
      },
      [varianteId, index, alActualizarOpcion]
    );

    const manejarEliminarOpcion = useCallback(() => {
      alEliminarOpcion(varianteId, index);
    }, [varianteId, index, alEliminarOpcion]);

    const errores = erroresOpciones && erroresOpciones[index] ? erroresOpciones[index] : {};

    return (
      <Grid container spacing={2}>
        <TituloForm
          titulo={`Opcion ${opcion.valorOpcion || index + 1}`}
          tituloVariant='h6'
          size={6}
        />
        <BotonForm label='Eliminar' onClick={manejarEliminarOpcion} />
        <CampoTextoForm
          label='Valor Opción'
          name={`valorOpcion-${varianteId}-${index}`}
          value={opcion.valorOpcion}
          onChange={(evento) => manejarActualizarOpcion('valorOpcion', evento.target.value)}
          error={Boolean(errores?.valorOpcion)}
          helperText={errores?.valorOpcion || ''}
        />
        <CampoTextoForm
          label='Cantidad'
          type='number'
          name={`cantidad-${varianteId}-${index}`}
          value={opcion.cantidad}
          onChange={(evento) => manejarActualizarOpcion('cantidad', evento.target.value)}
          error={Boolean(errores?.cantidad)}
          helperText={errores?.cantidad || ''}
        />
        <CampoTextoForm
          label='SKU Automático'
          name={`SKUautomatico-${varianteId}-${index}`}
          value={opcion.SKUautomatico}
          onChange={(evento) => manejarActualizarOpcion('SKUautomatico', evento.target.value)}
          error={Boolean(errores?.SKUautomatico)}
          helperText={errores?.SKUautomatico || ''}
        />
        <CampoTextoForm
          label='SKU Comercial'
          name={`SKUcomercial-${varianteId}-${index}`}
          value={opcion.SKUcomercial}
          onChange={(evento) => manejarActualizarOpcion('SKUcomercial', evento.target.value)}
          error={Boolean(errores?.SKUcomercial)}
          helperText={errores?.SKUcomercial || ''}
        />
        <CampoTextoForm
          label='Costo Adicional'
          type='number'
          name={`costoAdicional-${varianteId}-${index}`}
          value={opcion.costoAdicional}
          onChange={(evento) => manejarActualizarOpcion('costoAdicional', evento.target.value)}
          error={Boolean(errores?.costoAdicional)} 
          helperText={errores?.costoAdicional || ''}
          required={false}
        />
        <CampoTextoForm
          label='Descuento (%)'
          type='number'
          name={`descuento-${varianteId}-${index}`}
          value={opcion.descuento}
          onChange={(evento) => manejarActualizarOpcion('descuento', evento.target.value)}
          error={Boolean(errores?.descuento)}
          helperText={errores?.descuento}
          required={false}
        />
        <CampoSelectForm
          label='Estado'
          name={`estado-${varianteId}-${index}`}
          options={[
            { value: 1, label: 'Activo' },
            { value: 0, label: 'Inactivo' },
          ]}
          value={opcion.estado}
          onChange={(evento) => manejarActualizarOpcion('estado', evento.target.value)}
          error={Boolean(errores?.estado)}
          helperText={errores?.estado || ''}
          size={6}
        />
      </Grid>
    );
  }
);

export default CamposOpcion;
