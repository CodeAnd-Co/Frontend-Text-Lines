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
    maxLongitud = 100,
    ...rest
  }) => (
    <Grid size={6}>
      <CampoTexto
        label={label}
        name={name}
        value={value}
        onChange={(evento) => {
          const nuevoValor = evento.target.value.slice(0, maxLongitud);
          onChange({ target: { name, value: nuevoValor } });
        }}
        helperText={
          type === 'text' && maxLongitud
            ? `${value.length}/${maxLongitud} - Máximo de caracteres. ${helperText || ''}` // Cambiar textoAyuda por helperText
            : helperText
        }
        type={type}
        size='medium'
        required={required}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        error={error}
        inputProps={{ maxLength: type === 'text' ? maxLongitud : undefined }}
        {...rest}
      />
    </Grid>
  )
);

const CampoSelectForm = memo(
  ({
    label,
    name,
    options,
    value,
    onChange,
    placeholder,
    helperText,
    error,
    size = 12,
    required = true,
  }) => (
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
  ({
    opcion,
    index,
    varianteId,
    erroresOpciones,
    alActualizarOpcion,
    alEliminarOpcion,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
  }) => {
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
          error={Boolean(errores?.valorOpcion)}
          helperText={errores?.valorOpcion || ''}
        />
        <CampoTextoForm
          label='Cantidad'
          type='number'
          name={`cantidad-${varianteId}-${index}`}
          value={opcion.cantidad}
          onChange={(evento) => manejarActualizarOpcion('cantidad', evento.target.value)}
          placeholder='Ingresa la cantidad'
          helperText={errores?.cantidad || ''}
          error={Boolean(errores?.cantidad)}
          min={1}
          onKeyDown={(evento) => {
            prevenirNumerosNegativos(evento);
            // Evita el punto decimal
            if (evento.key === '.' || evento.key === ',') {
              evento.preventDefault();
            }
          }}
          onInput={(evento) => {
            // Solo permite números enteros positivos
            const valor = evento.target.value;
            if (valor === '' || /^\d+$/.test(valor)) {
              evento.target.value = valor;
            } else {
              evento.target.value = valor.replace(/\D/g, '');
            }
          }}
        />
        <CampoTextoForm
          label='SKU Automático'
          name={`SKUautomatico-${varianteId}-${index}`}
          value={opcion.SKUautomatico}
          onChange={(evento) => manejarActualizarOpcion('SKUautomatico', evento.target.value)}
          error={Boolean(errores?.SKUautomatico)}
          helperText={errores?.SKUautomatico || ''}
          required={false}
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
          error={Boolean(errores?.costoAdicional)}
          helperText={errores?.costoAdicional || ''}
          onChange={(evento) => manejarActualizarOpcion('costoAdicional', evento.target.value)}
          placeholder='Ingresa el costo adicional'
          textoAyuda={errores?.costoAdicional}
          error={errores?.costoAdicional}
          min={1}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            if (evento.target.value && evento.target.value < 1) {
              evento.target.value = 1;
            }
          }}
        />
        <CampoTextoForm
          label='Descuento (%)'
          type='number'
          name={`descuento-${varianteId}-${index}`}
          value={opcion.descuento}
          error={Boolean(errores?.descuento)}
          helperText={errores?.descuento || ''}
          onChange={(evento) => manejarActualizarOpcion('descuento', evento.target.value)}
          placeholder='Ingresa el descuento'
          textoAyuda={errores?.descuento}
          error={errores?.descuento}
          min={1}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            if (evento.target.value && evento.target.value < 1) {
              evento.target.value = 1;
            }
          }}
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
