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
    textoAyuda,
    type = 'text',
    multiline = false,
    rows = 1,
    error,
    min,
    ...rest
  }) => (
    <Grid size={6}>
      <CampoTexto
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={(evento) => {
          if (type === 'number') {
            const valor = Math.max(min || 1, Number(evento.target.value) || 0); // Asegura que el valor sea al menos el mínimo
            onChange({ target: { name, value: valor } });
          }
        }}
        onKeyDown={(evento) => {
          if (type === 'number' && ['-', 'e', 'E', '+'].includes(evento.key)) {
            evento.preventDefault(); // Bloquea caracteres no válidos
          }
        }}
        onInput={(evento) => {
          if (type === 'number' && evento.target.value && evento.target.value < (min || 1)) {
            evento.target.value = min || 1; // Ajusta el valor al mínimo permitido
          }
        }}
        type={type}
        size='medium'
        required
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        error={error}
        helperText={textoAyuda}
        {...rest}
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

const CamposOpcion = memo(
  ({ opcion, index, varianteId, erroresOpciones, alActualizarOpcion, alEliminarOpcion }) => {
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
          titulo={`Opción ${opcion.valorOpcion || index + 1}`}
          tituloVariant='h6'
          size={6}
        />
        <BotonForm label='Eliminar' onClick={manejarEliminarOpcion} />
        <CampoTextoForm
          label='Valor Opción'
          name={`valorOpcion-${varianteId}-${index}`}
          value={opcion.valorOpcion}
          onChange={(evento) => manejarActualizarOpcion('valorOpcion', evento.target.value)}
          error={errores?.valorOpcion}
          textoAyuda={errores?.valorOpcion}
        />
        <CampoTextoForm
          label='Cantidad'
          type='number'
          name={`cantidad-${varianteId}-${index}`}
          value={opcion.cantidad}
          onChange={(evento) => manejarActualizarOpcion('cantidad', evento.target.value)}
          placeholder='Ingresa la cantidad'
          textoAyuda={errores?.cantidad}
          error={errores?.cantidad}
          min={1}
        />
        <CampoTextoForm
          label='SKU Automático'
          name={`SKUautomatico-${varianteId}-${index}`}
          value={opcion.SKUautomatico}
          onChange={(evento) => manejarActualizarOpcion('SKUautomatico', evento.target.value)}
          error={errores?.SKUautomatico}
          textoAyuda={errores?.SKUautomatico}
        />
        <CampoTextoForm
          label='SKU Comercial'
          name={`SKUcomercial-${varianteId}-${index}`}
          value={opcion.SKUcomercial}
          onChange={(evento) => manejarActualizarOpcion('SKUcomercial', evento.target.value)}
          error={errores?.SKUcomercial}
          textoAyuda={errores?.SKUcomercial}
        />
        <CampoTextoForm
          label='Costo Adicional'
          type='number'
          name={`costoAdicional-${varianteId}-${index}`}
          value={opcion.costoAdicional}
          onChange={(evento) => manejarActualizarOpcion('costoAdicional', evento.target.value)}
          placeholder='Ingresa el costo adicional'
          textoAyuda={errores?.costoAdicional}
          error={errores?.costoAdicional}
          min={1}
        />
        <CampoTextoForm
          label='Descuento (%)'
          type='number'
          name={`descuento-${varianteId}-${index}`}
          value={opcion.descuento}
          onChange={(evento) => manejarActualizarOpcion('descuento', evento.target.value)}
          placeholder='Ingresa el descuento'
          textoAyuda={errores?.descuento}
          error={errores?.descuento}
          min={1}
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
          error={errores?.estado}
          textoAyuda={errores?.estado}
          size={6}
        />
      </Grid>
    );
  }
);

const prevenirNumerosNegativos = (evento) => {
  if (['-', 'e', 'E', '+'].includes(evento.key)) {
    evento.preventDefault();
  }
};

export default CamposOpcion;
