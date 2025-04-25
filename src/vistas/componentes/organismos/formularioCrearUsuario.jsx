import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import CampoTexto from '../../componentes/atomos/CampoTexto';
import CampoSelect from '../../Componentes/atomos/CampoSelect';

const FormularioCrearUsuario = ({ datosUsuario, setDatosUsuario, errores = {} }) => {
  const gridStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setDatosUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleFechaNacimiento = (nuevaFecha) => {
    setDatosUsuario((prev) => ({
      ...prev,
      fechaNacimiento: nuevaFecha,
    }));
  };
  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  return (
    <Box
      component='form'
      sx={{
        flexGrow: 1,
        '& .MuiTextField-root': { margin: 1, width: '30ch' },
        '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container columns={12}>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Nombre'
            name='nombreCompleto'
            value={datosUsuario.nombreCompleto}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.nombreCompleto}
            helperText={errores.nombreCompleto && CAMPO_OBLIGATORIO}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Apellido'
            name='apellido'
            value={datosUsuario.apellido}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.apellido}
            helperText={errores.apellido && CAMPO_OBLIGATORIO}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              required
              label='Fecha de nacimiento'
              value={datosUsuario.fechaNacimiento}
              onChange={handleFechaNacimiento}
              sx={{ width: '30ch' }}
              slotProps={{
                textField: {
                  error: !!errores.fechaNacimiento,
                  helperText:
                    errores.fechaNacimiento === true
                      ? CAMPO_OBLIGATORIO
                      : errores.fechaNacimiento || '',
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoSelect
            required
            error={!!errores.genero}
            helperText={errores.genero && CAMPO_OBLIGATORIO}
            label='Género'
            name='genero'
            size='medium'
            value={datosUsuario.genero}
            onChange={handleChange}
            options={[
              { value: 'Hombre', label: 'Hombre' },
              { value: 'Mujer', label: 'Mujer' },
              { value: 'Otro', label: 'Otro' },
            ]}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Correo Electrónico'
            name='correoElectronico'
            value={datosUsuario.correoElectronico}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.correoElectronico}
            helperText={errores.correoElectronico && CAMPO_OBLIGATORIO}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Número de Teléfono'
            name='numeroTelefono'
            value={datosUsuario.numeroTelefono}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.numeroTelefono}
            helperText={errores.numeroTelefono && CAMPO_OBLIGATORIO}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            required
            label='Dirección'
            name='direccion'
            value={datosUsuario.direccion}
            onChange={handleChange}
            size='medium'
            error={!!errores.direccion}
            helperText={errores.direccion && CAMPO_OBLIGATORIO}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoSelect
            label='Cliente'
            name='cliente'
            size='medium'
            value={datosUsuario.cliente}
            onChange={handleChange}
            required
            error={!!errores.cliente}
            helperText={errores.cliente && CAMPO_OBLIGATORIO}
            options={[
              { value: 'Toyota', label: 'Toyota' },
              { value: 'Otro', label: 'Otro' },
            ]}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoSelect
            label='Rol'
            name='rol'
            size='medium'
            value={datosUsuario.rol}
            onChange={handleChange}
            required
            error={!!errores.rol}
            helperText={errores.rol && CAMPO_OBLIGATORIO}
            options={[
              { value: 'Super Administrador', label: 'Super Administrador' },
              { value: 'Administrador', label: 'Administrador' },
              { value: 'Supervisor', label: 'Supervisor' },
              { value: 'Nada', label: 'Nada' },
            ]}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Contraseña'
            name='contrasenia'
            type='password'
            value={datosUsuario.contrasenia}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.contrasenia}
            helperText={
              errores.contrasenia === true ? CAMPO_OBLIGATORIO : errores.contrasenia || ''
            }
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <CampoTexto
            label='Confirmar contraseña'
            name='confirmarContrasenia'
            type='password'
            value={datosUsuario.confirmarContrasenia}
            onChange={handleChange}
            required
            size='medium'
            error={!!errores.confirmarContrasenia}
            helperText={
              errores.confirmarContrasenia === true
                ? CAMPO_OBLIGATORIO
                : errores.confirmarContrasenia || ''
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

FormularioCrearUsuario.propTypes = {
  datosUsuario: PropTypes.object.isRequired,
  setDatosUsuario: PropTypes.func.isRequired,
  errores: PropTypes.object,
};

export default FormularioCrearUsuario;
