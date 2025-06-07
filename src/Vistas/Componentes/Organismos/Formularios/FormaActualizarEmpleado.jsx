import { Grid } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CampoTexto from '@Atomos/CampoTexto';

// Límites para los campos
const LIMITE_NUMERO_EMERGENCIA = 10;
const LIMITE_AREA_TRABAJO = 50;
const LIMITE_POSICION = 50;
const LIMITE_CANTIDAD_PUNTOS = 10;
const MENSAJE_LIMITE = 'Máximo caracteres';
const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

const FormaActualizarEmpleado = ({
  datosEmpleado,
  erroresValidacion,
  manejarCambio,
  manejarAntiguedad,
  obtenerHelperText,
}) => {
  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <Grid container columns={12}>
      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Número de Emergencia'
          name='numeroEmergencia'
          value={datosEmpleado.numeroEmergencia}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.numeroEmergencia}
          helperText={
            erroresValidacion.numeroEmergencia
              ? CAMPO_OBLIGATORIO
              : `${datosEmpleado.numeroEmergencia.length}/${LIMITE_NUMERO_EMERGENCIA} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_NUMERO_EMERGENCIA,
            type: 'text',
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Área de Trabajo'
          name='areaTrabajo'
          value={datosEmpleado.areaTrabajo}
          onKeyPress={(event) => {
            if (!/^[a-zA-Z\s]*$/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.areaTrabajo}
          helperText={
            erroresValidacion.areaTrabajo
              ? CAMPO_OBLIGATORIO
              : `${datosEmpleado.areaTrabajo.length}/${LIMITE_AREA_TRABAJO} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_AREA_TRABAJO,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Posición'
          name='posicion'
          value={datosEmpleado.posicion}
          type='text'
          inputMode='text'
          onKeyPress={(event) => {
            if (!/^[a-zA-Z\s]*$/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.posicion}
          helperText={
            erroresValidacion.posicion
              ? CAMPO_OBLIGATORIO
              : `${datosEmpleado.posicion.length}/${LIMITE_POSICION} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_POSICION,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Cantidad de Puntos'
          name='cantidadPuntos'
          value={datosEmpleado.cantidadPuntos}
          onChange={(num) => {
            const soloNumeros = num.target.value.replace(/\D/g, '');
            manejarCambio({ target: { name: 'cantidadPuntos', value: soloNumeros } });
          }}
          required
          size='medium'
          error={!!erroresValidacion.cantidadPuntos}
          helperText={
            erroresValidacion.cantidadPuntos
              ? CAMPO_OBLIGATORIO
              : `${
                  (datosEmpleado.cantidadPuntos || '').toString().length
                }/${LIMITE_CANTIDAD_PUNTOS} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_CANTIDAD_PUNTOS,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
          <DateField
            required
            label='Antigüedad'
            value={datosEmpleado.antiguedad}
            onChange={manejarAntiguedad}
            format='DD/MM/YYYY'
            sx={{ width: '30ch' }}
            slotProps={{
              textField: {
                error: !!erroresValidacion.antiguedad,
                helperText: obtenerHelperText('antiguedad'),
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default FormaActualizarEmpleado;
