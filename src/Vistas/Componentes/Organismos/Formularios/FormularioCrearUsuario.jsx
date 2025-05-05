//RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useConsultarRoles } from '@Hooks/Roles/useConsultarRoles';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useCrearUsuario } from '@Hooks/Usuarios/useCrearUsuario';
import CampoSelectMultiple from '@Atomos/CampoSelectMultiple';

const FormularioCrearUsuario = ({ open, onClose, onUsuarioCreado }) => {
  const [alerta, setAlerta] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState({
    nombreCompleto: '',
    apellido: '',
    correoElectronico: '',
    contrasenia: '',
    confirmarContrasenia: '',
    numeroTelefono: '',
    direccion: '',
    codigoPostal: '',
    fechaNacimiento: null,
    genero: '',
    cliente: [],
    rol: '',
  });

  const { errores, handleGuardarUsuario } = useCrearUsuario();
  const { roles, cargando } = useConsultarRoles();
  const { clientes } = useConsultarClientes();

  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardarUsuario(datosUsuario);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        if (onUsuarioCreado) await onUsuarioCreado();
        const resumenUsuario = `
          Usuario ${datosUsuario.nombreCompleto} ${datosUsuario.apellido} creado exitosamente.
        `;

        setAlerta({
          tipo: 'success',
          mensaje: resumenUsuario,
        });

        setDatosUsuario({
          nombreCompleto: '',
          apellido: '',
          correoElectronico: '',
          contrasenia: '',
          confirmarContrasenia: '',
          numeroTelefono: '',
          direccion: '',
          codigoPostal: '',
          fechaNacimiento: null,
          genero: '',
          cliente: [],
          rol: '',
        });
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

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarFechaNacimiento = (nuevaFecha) => {
    setDatosUsuario((prev) => ({
      ...prev,
      fechaNacimiento: nuevaFecha,
    }));
  };
  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <ModalFlotante
      open={open}
      onClose={manejarCierre}
      onConfirm={manejarConfirmacion}
      titulo='Crear nuevo usuario'
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateField
                required
                label='Fecha de nacimiento'
                value={datosUsuario.fechaNacimiento}
                onChange={manejarFechaNacimiento}
                format="DD/MM/YYYY"
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
                maxLength: 13,
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
              options={roles.map((rol) => ({
                value: rol.idRol,
                label: rol.nombre,
              }))}
              disabled={cargando}
            />
          </Grid>

          <Grid size={6} sx={estiloCuadricula}>
            <CampoTexto
              label='Contraseña'
              name='contrasenia'
              type='password'
              value={datosUsuario.contrasenia}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.contrasenia}
              autoComplete='new-password'
              helperText={
                errores.contrasenia === true ? CAMPO_OBLIGATORIO : errores.contrasenia || ''
              }
            />
          </Grid>

          <Grid size={6} sx={estiloCuadricula}>
            <CampoTexto
              label='Confirmar contraseña'
              name='confirmarContrasenia'
              type='password'
              value={datosUsuario.confirmarContrasenia}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.confirmarContrasenia}
              autoComplete='new-password'
              helperText={
                errores.confirmarContrasenia === true
                  ? CAMPO_OBLIGATORIO
                  : errores.confirmarContrasenia || ''
              }
            />
          </Grid>
        </Grid>
      </Box>

      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='4000'
          onClose={() => setAlerta(null)}
        />
      )}
    </ModalFlotante>
  );
};

export default FormularioCrearUsuario;
