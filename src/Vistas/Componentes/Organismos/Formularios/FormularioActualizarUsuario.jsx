import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormularioActualizarUsuario from '@Organismos/Formularios/FormularioActualizarUsuario';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useActualizarUsuario } from '@Hooks/Usuarios/useActualizarUsuario';
import CampoSelectMultiple from '@Atomos/CampoSelectMultiple';
import { useAccionesUsuario } from '@Hooks/Usuarios/useAccionesUsuario';

const FormularioActualizarUsuario = ({ open, onClose, usuario, onUsuarioActualizado }) => {
  const {
    datosUsuario,
    setDatosUsuario,
    erroresValidacion,
    alerta,
    setAlerta,
    cargando,
    esEdicion,
    manejarCambio,
    manejarFechaNacimiento,
    obtenerHelperText,
    handleGuardar,
    limpiarFormulario,
    CAMPO_OBLIGATORIO,
  } = useAccionesUsuario(usuarioInicial); // usuarioInicial es null para crear, o el usuario para editar

  useEffect(() => {
    if (usuario) {
      setDatosUsuario({
        nombreCompleto: usuario.nombreCompleto || '',
        apellido: usuario.apellido || '',
        correoElectronico: usuario.correoElectronico || '',
        numeroTelefono: usuario.numeroTelefono || '',
        direccion: usuario.direccion || '',
        codigoPostal: usuario.codigoPostal || '',
        fechaNacimiento: usuario.fechaNacimiento || null,
        genero: usuario.genero || '',
        cliente: usuario.cliente || [],
        rol: usuario.rol || '',
        contrasenia: '',
      });
    }
  }, [usuario]);

  const { errores, handleActualizarUsuario } = useActualizarUsuario();
  const { roles, cargando: cargandoRoles } = useConsultarRoles();
  const { clientes } = useConsultarClientes();
  const esSuperAdmin = datosUsuario.rol === 1;

  const manejarConfirmacion = async () => {
    const resultado = await handleActualizarUsuario({
      ...datosUsuario,
      idUsuario: usuario.idUsuario,
    });

    if (resultado?.mensaje) {
      if (resultado.exito) {
        setAlerta({
          tipo: 'success',
          mensaje: `Usuario actualizado exitosamente.`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
          duracion: 3000,
        });
        setTimeout(async () => {
          if (onUsuarioActualizado) await onUsuarioActualizado();
          manejarCierre();
        }, 2000);
      } else {
        setAlerta({
          tipo: 'error',
          mensaje: resultado.mensaje,
        });
      }
    }
  };

  const manejarCierre = () => {
    setAlerta(null);
    onClose();
  };

  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <>
      <ModalFlotante
        open={open}
        onClose={manejarCierre}
        onConfirm={manejarConfirmacion}
        titulo='Actualizar usuario'
      >
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
                error={!!errores.nombreCompleto}
                helperText={errores.nombreCompleto && CAMPO_OBLIGATORIO}
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
                error={!!errores.apellido}
                helperText={errores.apellido && CAMPO_OBLIGATORIO}
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
            <Grid size={6} sx={estiloCuadricula}>
              <CampoSelect
                required
                label='Género'
                name='genero'
                value={datosUsuario.genero}
                onChange={manejarCambio}
                size='medium'
                error={!!errores.genero}
                helperText={errores.genero && CAMPO_OBLIGATORIO}
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
                error={!!errores.correoElectronico}
                helperText={
                  errores.correoElectronico === true
                    ? CAMPO_OBLIGATORIO
                    : errores.correoElectronico || ''
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
                error={!!errores.numeroTelefono}
                helperText={
                  errores.numeroTelefono === true ? CAMPO_OBLIGATORIO : errores.numeroTelefono || ''
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
                error={!!errores.direccion}
                helperText={errores.direccion && CAMPO_OBLIGATORIO}
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
                error={!!errores.rol}
                helperText={errores.rol && CAMPO_OBLIGATORIO}
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
                error={!!errores.cliente}
                helperText={errores.cliente && CAMPO_OBLIGATORIO}
                options={clientes.map((cliente) => ({
                  value: cliente.idCliente,
                  label: cliente.nombreComercial,
                }))}
                disabled={esSuperAdmin}
              />
            </Grid>
            <Grid size={6} sx={estiloCuadricula}>
              <CampoTexto
                label='Contraseña (dejar en blanco para no cambiar)'
                name='contrasenia'
                type='password'
                value={datosUsuario.contrasenia}
                onChange={manejarCambio}
                size='medium'
                error={!!errores.contrasenia}
                autoComplete='new-password'
                helperText={errores.contrasenia || ''}
              />
            </Grid>
          </Grid>
        </Box>
      </ModalFlotante>
      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='3000'
          onClose={() => setAlerta(null)}
          centradoInferior
        />
      )}
    </>
  );
};

export default FormularioActualizarUsuario;
