//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo, useRef, useCallback } from 'react';
import { Grid, useTheme } from '@mui/material'; // Agrega useTheme aquí
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import TarjetaElementoAccion from '@Moleculas/TarjetaElementoAccion';
import CamposOpcion from '@Organismos/Formularios/CamposOpcion';
import { tokens } from '@SRC/theme';

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
    maxLongitud = 100,
    maxLongitudDescripcion = 300,
    ...rest
  }) => {
    // Determina el límite de caracteres según el campo
    const limiteCaracteres = name.includes('descripcion') ? maxLongitudDescripcion : maxLongitud;

    return (
      <Grid size={6}>
        <CampoTexto
          label={label}
          name={name}
          value={value}
          onChange={(evento) => {
            const nuevoValor = evento.target.value.slice(0, limiteCaracteres);
            onChange({ target: { name, value: nuevoValor } });
          }}
          helperText={
            type === 'text' && limiteCaracteres
              ? `${value.length}/${limiteCaracteres} - Máximo de caracteres. ${helperText || ''}`
              : helperText
          }
          type={type}
          size='medium'
          required
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          error={error}
          inputProps={{ maxLength: limiteCaracteres }}
          {...rest}
        />
      </Grid>
    );
  }
);

const TituloForm = memo(({ titulo, tituloVariant, size = 12 }) => (
  <Grid size={size} overflow='hidden'>
    <Texto variant={tituloVariant} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const BotonForm = memo(({ selected, fullWidth, outlineColor, label, onClick }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  return (
    <Grid size={6} display='flex' alignItems='center' justifyContent='end'>
      <Boton
        variant='contained'
        selected={selected}
        fullWidth={fullWidth}
        color='primary'
        size='medium'
        backgroundColor={colores.rojo[1]}
        outlineColor={outlineColor}
        label={label}
        onClick={onClick}
      />
    </Grid>
  );
});

const CampoCrear = memo(({ etiqueta, onClic }) => (
  <Grid size={12}>
    <TarjetaAccion icono='Add' texto={etiqueta} onClick={onClic} hoverScale={false} />
  </Grid>
));

const CampoImagenesVariante = memo(
  ({ varianteId, imagenesVariante, alAgregarImagenVariante, alEliminarImagenVariante }) => {
    const fileInputRef = useRef();

    const handleFileSelect = useCallback(
      (evento) => {
        const files = Array.from(evento.target.files);
        if (files.length === 0) return;

        alAgregarImagenVariante(varianteId, files);
        evento.target.value = '';
      },
      [varianteId, alAgregarImagenVariante]
    );

    return (
      <>
        <Grid size={12}>
          <Texto variant='h6'>Imágenes de la Variante</Texto>
        </Grid>

        {imagenesVariante && imagenesVariante.length > 0 && (
          <Grid size={12} container spacing={1}>
            {imagenesVariante.map((imagen, index) => (
              <Grid key={`img-${varianteId}-${index}`} size={12} md={6}>
                <TarjetaElementoAccion
                  icono='Image'
                  texto={imagen.file.name}
                  onEliminar={() => alEliminarImagenVariante(varianteId, imagen.id)}
                  tooltipEliminar='Eliminar'
                  borderColor='primary.light'
                  backgroundColor='primary.lighter'
                  iconColor='primary'
                  iconSize='large'
                  textoVariant='caption'
                  tabIndex={0}
                  disabled={false}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Grid size={12}>
          <TarjetaAccion
            icono='AddPhotoAlternate'
            texto='Agregar imagen'
            onClick={() => fileInputRef.current.click()}
            hoverScale={false}
          />
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            style={{ display: 'none' }}
          />
        </Grid>
      </>
    );
  }
);

const CamposVariante = memo(
  ({
    varianteId,
    variante,
    imagenesVariante,
    erroresVariantes,
    intentoEnviar,
    alActualizarVariante,
    alEliminarVariante,
    alAgregarOpcion,
    alActualizarOpcion,
    alEliminarOpcion,
    alAgregarImagenVariante,
    alEliminarImagenVariante,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
  }) => {
    const manejarActualizarVariante = useCallback(
      (campo, valor) => {
        alActualizarVariante(varianteId, campo, valor);
      },
      [varianteId, alActualizarVariante]
    );

    const manejarEliminarVariante = useCallback(() => {
      alEliminarVariante(varianteId);
    }, [varianteId, alEliminarVariante]);

    const manejarAgregarOpcion = useCallback(() => {
      alAgregarOpcion(varianteId);
    }, [varianteId, alAgregarOpcion]);

    const errores
      = erroresVariantes && erroresVariantes[varianteId] ? erroresVariantes[varianteId] : {};

    return (
      <>
        <TituloForm
          titulo={`Variante ${variante.nombreVariante || varianteId}`}
          tituloVariant='h6'
          size={6}
        />
        <BotonForm label='Eliminar' onClick={manejarEliminarVariante} />

        <CampoImagenesVariante
          varianteId={varianteId}
          imagenesVariante={imagenesVariante}
          alAgregarImagenVariante={alAgregarImagenVariante}
          alEliminarImagenVariante={alEliminarImagenVariante}
        />

        <CampoTextoForm
          label='Nombre de la Variante'
          name={`nombreVariante-${varianteId}`}
          value={variante.nombreVariante || ''}
          onChange={(evento) => manejarActualizarVariante('nombreVariante', evento.target.value)}
          placeholder='Ej: Color, Talla, Material...'
          error={Boolean(errores?.nombreVariante)}
          helperText={errores?.nombreVariante || ''}
          maxLongitud={100}
        />

        <CampoTextoForm
          label='Descripción de la Variante'
          name={`descripcion-${varianteId}`}
          value={variante.descripcion || ''}
          onChange={(evento) => manejarActualizarVariante('descripcion', evento.target.value)}
          placeholder='Descripción de la variante'
          error={errores?.descripcion}
          helperText={
            variante.descripcion
              ? `${variante.descripcion.length}/${300} - Máximo de caracteres. ${
                  errores?.descripcion || ''
                }`
              : errores?.descripcion
          }
          maxLongitudDescripcion={300}
        />

        {(variante.opciones || []).map((opcion, index) => (
          <CamposOpcion
            key={opcion.id || index}
            index={index}
            opcion={opcion}
            varianteId={varianteId}
            erroresOpciones={errores?.opciones}
            intentoEnviar={intentoEnviar}
            alActualizarOpcion={alActualizarOpcion}
            alEliminarOpcion={alEliminarOpcion}
            prevenirNumerosNegativos={prevenirNumerosNegativos}
            prevenirNumerosNoDecimales={prevenirNumerosNoDecimales}
          />
        ))}
        <CampoCrear etiqueta='Crear Opción' onClic={manejarAgregarOpcion} />
      </>
    );
  }
);

export default CamposVariante;
