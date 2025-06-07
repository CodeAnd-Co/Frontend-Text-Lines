import { Grid } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';

// Límites para los campos
const LIMITE_NUMERO_EMERGENCIA = 10;
const LIMITE_NOMBRE_COMPLETO = 100;
const LIMITE_AREA_TRABAJO = 50;
const LIMITE_POSICION = 50;
const LIMITE_CORREO = 100;
const LIMITE_TELEFONO = 10;
const LIMITE_DIRECCION = 100;
const LIMITE_CONTRASENIA = 64;
const LIMITE_CANTIDAD_PUNTOS = 10;
const MENSAJE_LIMITE = 'Máximo caracteres';
const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

const FormaCrearEmpleado = ({
  datosEmpleado,
  erroresValidacion,
  manejarCambio,
  manejarAntiguedad,
  manejarFechaNacimiento,
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
          label='Nombre Completo'
          name='nombreCompleto'
          value={datosEmpleado.nombreCompleto}
          onChange={(letra) => {
            const soloLetras = letra.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // solo letras y espacios
            manejarCambio({ target: { name: 'nombreCompleto', value: soloLetras } });
          }}
          required
          size='medium'
          error={!!erroresValidacion.nombreCompleto}
          helperText={
            erroresValidacion.nombreCompleto
              ? erroresValidacion.nombreCompleto === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.nombreCompleto
              : `${datosEmpleado.nombreCompleto.length}/${LIMITE_NOMBRE_COMPLETO} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_NOMBRE_COMPLETO,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
          <DateField
            required
            label='Fecha de nacimiento'
            value={datosEmpleado.fechaNacimiento}
            onChange={manejarFechaNacimiento}
            format='DD/MM/YYYY'
            sx={{ width: '30ch' }}
            slotProps={{
              textField: {
                error: !!erroresValidacion.fechaNacimiento,
                helperText:
                  erroresValidacion.fechaNacimiento === true
                    ? CAMPO_OBLIGATORIO
                    : erroresValidacion.fechaNacimiento || '',
              },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoSelect
          required
          label='Género'
          name='genero'
          value={datosEmpleado.genero}
          onChange={manejarCambio}
          size='medium'
          error={!!erroresValidacion.genero}
          helperText={erroresValidacion.genero && CAMPO_OBLIGATORIO}
          options={[
            { value: 'Hombre', label: 'Hombre' },
            { value: 'Mujer', label: 'Mujer' },
            { value: 'Otro', label: 'Otro' },
          ]}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Correo Electrónico'
          name='correoElectronico'
          value={datosEmpleado.correoElectronico}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.correoElectronico}
          helperText={
            erroresValidacion.correoElectronico
              ? erroresValidacion.correoElectronico === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.correoElectronico
              : `${datosEmpleado.correoElectronico.length}/${LIMITE_CORREO} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_CORREO,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Número de Teléfono'
          name='numeroTelefono'
          value={datosEmpleado.numeroTelefono}
          onChange={(num) => {
            const soloNumeros = num.target.value.replace(/\D/g, ''); // elimina todo lo que no es dígito
            manejarCambio({ target: { name: 'numeroTelefono', value: soloNumeros } });
          }}
          required
          size='medium'
          error={!!erroresValidacion.numeroTelefono}
          helperText={
            erroresValidacion.numeroTelefono
              ? erroresValidacion.numeroTelefono === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.numeroTelefono
              : `${datosEmpleado.numeroTelefono.length}/${LIMITE_TELEFONO} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_TELEFONO,
            inputMode: 'numeric', // para teclado numérico en móviles
            pattern: '[0-9]*',
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Dirección'
          name='direccion'
          value={datosEmpleado.direccion}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.direccion}
          helperText={
            erroresValidacion.direccion
              ? CAMPO_OBLIGATORIO
              : `${datosEmpleado.direccion.length}/${LIMITE_DIRECCION} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_DIRECCION,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Contraseña'
          name='contrasenia'
          type='password'
          value={datosEmpleado.contrasenia}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.contrasenia}
          autoComplete='new-password'
          helperText={
            erroresValidacion.contrasenia
              ? erroresValidacion.contrasenia === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.contrasenia
              : `${datosEmpleado.contrasenia.length}/${LIMITE_CONTRASENIA} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_CONTRASENIA,
          }}
        />
      </Grid>

      <Grid size={6} sx={estiloCuadricula}>
        <CampoTexto
          label='Confirmar contraseña'
          name='confirmarContrasenia'
          type='password'
          value={datosEmpleado.confirmarContrasenia}
          onChange={manejarCambio}
          required
          size='medium'
          error={!!erroresValidacion.confirmarContrasenia}
          autoComplete='new-password'
          helperText={
            erroresValidacion.confirmarContrasenia
              ? erroresValidacion.confirmarContrasenia === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.confirmarContrasenia
              : `${datosEmpleado.confirmarContrasenia.length}/${LIMITE_CONTRASENIA} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_CONTRASENIA,
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
              : `${datosEmpleado.cantidadPuntos.length}/${LIMITE_CANTIDAD_PUNTOS} - ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_CANTIDAD_PUNTOS,
            inputMode: 'numeric',
            pattern: '[0-9]',
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

export default FormaCrearEmpleado;
