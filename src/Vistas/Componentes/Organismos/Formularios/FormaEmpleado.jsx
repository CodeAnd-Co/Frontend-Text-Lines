import { Grid } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CampoTexto from '@Atomos/CampoTexto';

const FormaEmpleado = ({
  datosEmpleado,
  erroresValidacion,
  manejarCambio,
  manejarAntiguedad,
  obtenerHelperText,
  esEdicion,
}) => {
  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <Grid container columns={12}>
      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='ID Empleado'
          name='idEmpleado'
          disabled={esEdicion}
          value={datosEmpleado.idEmpleado}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.idEmpleado}
          helperText={obtenerHelperText('idEmpleado')}
          inputProps={{
            maxLength: 8,
            type: 'number',
            min: 1,
            step: 1,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='ID Usuario'
          name='idUsuario'
          disabled={esEdicion}
          value={datosEmpleado.idUsuario}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.idUsuario}
          helperText={obtenerHelperText('idUsuario')}
          inputProps={{
            maxLength: 8,
            type: 'number',
            min: 1,
            step: 1,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Número de Emergencia'
          name='numeroEmergencia'
          value={datosEmpleado.numeroEmergencia}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.numeroEmergencia}
          helperText={obtenerHelperText('numeroEmergencia')}
          inputProps={{
            maxLength: 10,
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
          helperText={obtenerHelperText('areaTrabajo')}
          inputProps={{
            maxLength: 50,
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
          helperText={obtenerHelperText('posicion')}
          inputProps={{
            maxLength: 40,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Cantidad de Puntos'
          name='cantidadPuntos'
          value={datosEmpleado.cantidadPuntos}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.cantidadPuntos}
          helperText={obtenerHelperText('cantidadPuntos')}
          inputProps={{
            maxLength: 10,
            type: 'number',
            min: 0,
            step: 1,
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

export default FormaEmpleado;
