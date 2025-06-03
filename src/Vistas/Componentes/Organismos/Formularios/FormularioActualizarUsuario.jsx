import { useState, useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import CampoSelectMultiple from '@Atomos/CampoSelectMultiple';

const FormularioActualizarUsuario = ({
  datosUsuario,
  erroresValidacion,
  manejarCambio,
  manejarFechaNacimiento,
  obtenerHelperText,
  roles = [],
  clientes = [],
  cargandoRoles = false,
  cargando = false,
  esSuperAdmin = false,
  CAMPO_OBLIGATORIO = 'Este campo es obligatorio',
}) => {
  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Box
      component='form'
      method='POST'
      sx={{
        flexGrow: 1,
        '& .MuiTextField-root': { margin: 1, width: '30ch' },
        '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container columns={12}>
        <Grid size={6} sx={estiloCuadricula}>
          <CampoTexto
            label='Nombre'
            name='nombreCompleto'
            value={datosUsuario.nombreCompleto}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.nombreCompleto}
            helperText={erroresValidacion.nombreCompleto && CAMPO_OBLIGATORIO}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoTexto
            label='Apellido'
            name='apellido'
            value={datosUsuario.apellido}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.apellido}
            helperText={erroresValidacion.apellido && CAMPO_OBLIGATORIO}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
            <DateField
              required
              label='Fecha de nacimiento'
              value={datosUsuario.fechaNacimiento}
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
            value={datosUsuario.genero}
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
            value={datosUsuario.correoElectronico}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.correoElectronico}
            helperText={
              erroresValidacion.correoElectronico === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.correoElectronico || ''
            }
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoTexto
            label='Número de Teléfono'
            name='numeroTelefono'
            value={datosUsuario.numeroTelefono}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.numeroTelefono}
            helperText={
              erroresValidacion.numeroTelefono === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.numeroTelefono || ''
            }
            inputProps={{
              maxLength: 10,
            }}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoTexto
            label='Dirección'
            name='direccion'
            value={datosUsuario.direccion}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.direccion}
            helperText={erroresValidacion.direccion && CAMPO_OBLIGATORIO}
            inputProps={{
              maxLength: 100,
            }}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoSelect
            label='Rol'
            name='rol'
            value={datosUsuario.rol}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.rol}
            helperText={erroresValidacion.rol && CAMPO_OBLIGATORIO}
            options={roles
              .filter((rol) => rol.idRol !== 3)
              .map((rol) => ({
                value: rol.idRol,
                label: rol.nombre,
              }))}
            disabled={cargandoRoles}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoSelectMultiple
            label='Cliente'
            name='cliente'
            value={datosUsuario.cliente}
            onChange={manejarCambio}
            required
            size='medium'
            error={!!erroresValidacion.cliente}
            helperText={erroresValidacion.cliente && CAMPO_OBLIGATORIO}
            options={clientes.map((cliente) => ({
              value: cliente.idCliente,
              label: cliente.nombreComercial,
            }))}
            disabled={esSuperAdmin}
          />
        </Grid>

        <Grid size={6} sx={estiloCuadricula}>
          <CampoTexto
            label='Contraseña'
            name='contrasenia'
            type='password'
            value={datosUsuario.contrasenia}
            onChange={manejarCambio}
            size='medium'
            error={!!erroresValidacion.contrasenia}
            autoComplete='new-password'
            helperText={
              erroresValidacion.contrasenia === true
                ? CAMPO_OBLIGATORIO
                : erroresValidacion.contrasenia || ''
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormularioActualizarUsuario;
