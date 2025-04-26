//RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '../../atomos/CampoTexto';
import CampoSelect from '../../atomos/CampoSelect';
import Alerta from '../../moleculas/Alerta';
import ModalFlotante from '../../organismos/ModalFlotante';
import { useConsultarRoles } from '../../../../hooks/Roles/useConsultarRoles';
import { useConsultarClientes } from '../../../../hooks/Clientes/useConsultarClientes';
import { useCrearUsuario } from '../../../../hooks/Usuarios/useCrearUsuario';

const FormularioCrearUsuario = ({ open, onClose }) => {
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
    cliente: '',
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
        const resumenUsuario = `
          Usuario creado exitosamente:
          • Nombre: ${datosUsuario.nombreCompleto} ${datosUsuario.apellido}
          • Correo: ${datosUsuario.correoElectronico}
          • Cliente: ${
            clientes.find((cliente) => cliente.idCliente === datosUsuario.cliente)
              ?.nombreComercial || 'N/A'
          }
          • Rol: ${roles.find((rol) => rol.idRol === datosUsuario.rol)?.nombre || 'N/A'}
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
          cliente: '',
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
          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Nombre'
              name='nombreCompleto'
              value={datosUsuario.nombreCompleto}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.nombreCompleto}
              helperText={errores.nombreCompleto && CAMPO_OBLIGATORIO}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Apellido'
              name='apellido'
              value={datosUsuario.apellido}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.apellido}
              helperText={errores.apellido && CAMPO_OBLIGATORIO}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                required
                label='Fecha de nacimiento'
                value={datosUsuario.fechaNacimiento}
                onChange={manejarFechaNacimiento}
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Número de Teléfono'
              name='numeroTelefono'
              value={datosUsuario.numeroTelefono}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.numeroTelefono}
              helperText={errores.numeroTelefono && CAMPO_OBLIGATORIO}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Dirección'
              name='direccion'
              value={datosUsuario.direccion}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.direccion}
              helperText={errores.direccion && CAMPO_OBLIGATORIO}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CampoSelect
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Contraseña'
              name='contrasenia'
              type='password'
              value={datosUsuario.contrasenia}
              onChange={manejarCambio}
              required
              size='medium'
              error={!!errores.contrasenia}
              helperText={
                errores.contrasenia === true ? CAMPO_OBLIGATORIO : errores.contrasenia || ''
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CampoTexto
              label='Confirmar contraseña'
              name='confirmarContrasenia'
              type='password'
              value={datosUsuario.confirmarContrasenia}
              onChange={manejarCambio}
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

      {alerta && (
        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />
      )}
    </ModalFlotante>
  );
};

export default FormularioCrearUsuario;
