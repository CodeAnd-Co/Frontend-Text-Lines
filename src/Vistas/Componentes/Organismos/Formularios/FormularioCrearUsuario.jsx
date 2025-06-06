//RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
import { useState, useEffect, useRef } from 'react';
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

// Límites para los campos
const LIMITE_NOMBRE = 50;
const LIMITE_APELLIDO = 50;
const LIMITE_CORREO = 100;
const LIMITE_TELEFONO = 10;
const LIMITE_DIRECCION = 100;
const LIMITE_CONTRASENIA = 64;
const MENSAJE_LIMITE = 'Máximo caracteres';

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
  const esSuperAdmin = datosUsuario.rol === 1;
  const CAMPO_OBLIGATORIO = 'Este campo es obligatorio';

  const rolAnterior = useRef(null);

  useEffect(() => {
    // Solo limpiar clientes si el rol cambió desde Super Admin a otro
    if (rolAnterior.current === 1 && datosUsuario.rol !== 1) {
      manejarCambio({
        target: {
          name: 'cliente',
          value: [],
        },
      });
    }

    // Si es Super Admin, seleccionar todos los clientes
    if (datosUsuario.rol === 1 && clientes.length > 0) {
      manejarCambio({
        target: {
          name: 'cliente',
          value: clientes.map((cliente) => cliente.idCliente),
        },
      });
    }

    // Guardar el rol actual para la próxima ejecución
    rolAnterior.current = datosUsuario.rol;
  }, [datosUsuario.rol, clientes]);

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardarUsuario(datosUsuario);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        //if (onUsuarioCreado) await onUsuarioCreado();
        const resumenUsuario = `
          Usuario ${datosUsuario.nombreCompleto} ${datosUsuario.apellido} creado exitosamente.
        `;

        setAlerta({
          tipo: 'success',
          mensaje: resumenUsuario,
          icono: true,
          cerrable: true,
          centradoInferior: true,
          duracion: 3000,
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
        setTimeout(async () => {
          if (onUsuarioCreado) await onUsuarioCreado(); // mover aquí
          manejarCierre();
        }, 2500);
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
    <>
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
                onChange={(letra) => {
                  const soloLetras = letra.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // solo letras y espacios
                  manejarCambio({ target: { name: 'nombreCompleto', value: soloLetras } });
                }}
                required
                size='medium'
                error={!!errores.nombreCompleto}
                helperText={
                  errores.nombreCompleto
                    ? CAMPO_OBLIGATORIO
                    : `${datosUsuario.nombreCompleto.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`
                }
                inputProps={{
                  maxLength: LIMITE_NOMBRE,
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
                helperText={
                  errores.apellido
                    ? CAMPO_OBLIGATORIO
                    : `${datosUsuario.apellido.length}/${LIMITE_APELLIDO} - ${MENSAJE_LIMITE}`
                }
                inputProps={{
                  maxLength: LIMITE_APELLIDO,
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
                  errores.correoElectronico
                    ? errores.correoElectronico === true
                      ? CAMPO_OBLIGATORIO
                      : errores.correoElectronico
                    : `${datosUsuario.correoElectronico.length}/${LIMITE_CORREO} - ${MENSAJE_LIMITE}`
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
                value={datosUsuario.numeroTelefono}
                onChange={(num) => {
                  const soloNumeros = num.target.value.replace(/\D/g, ''); // elimina todo lo que no es dígito
                  manejarCambio({ target: { name: 'numeroTelefono', value: soloNumeros } });
                }}
                required
                size='medium'
                error={!!errores.numeroTelefono}
                helperText={
                  errores.numeroTelefono
                    ? errores.numeroTelefono === true
                      ? CAMPO_OBLIGATORIO
                      : errores.numeroTelefono
                    : `${datosUsuario.numeroTelefono.length}/${LIMITE_TELEFONO} - ${MENSAJE_LIMITE}`
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
                value={datosUsuario.direccion}
                onChange={manejarCambio}
                required
                size='medium'
                error={!!errores.direccion}
                helperText={
                  errores.direccion
                    ? CAMPO_OBLIGATORIO
                    : `${datosUsuario.direccion.length}/${LIMITE_DIRECCION} - ${MENSAJE_LIMITE}`
                }
                inputProps={{
                  maxLength: LIMITE_DIRECCION,
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
                disabled={cargando}
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
                  errores.contrasenia
                    ? errores.contrasenia === true
                      ? CAMPO_OBLIGATORIO
                      : errores.contrasenia
                    : `${datosUsuario.contrasenia.length}/${LIMITE_CONTRASENIA} - ${MENSAJE_LIMITE}`
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
                value={datosUsuario.confirmarContrasenia}
                onChange={manejarCambio}
                required
                size='medium'
                error={!!errores.confirmarContrasenia}
                autoComplete='new-password'
                helperText={
                  errores.confirmarContrasenia
                    ? errores.confirmarContrasenia === true
                      ? CAMPO_OBLIGATORIO
                      : errores.confirmarContrasenia
                    : `${datosUsuario.confirmarContrasenia.length}/${LIMITE_CONTRASENIA} - ${MENSAJE_LIMITE}`
                }
                inputProps={{
                  maxLength: LIMITE_CONTRASENIA,
                }}
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

export default FormularioCrearUsuario;
