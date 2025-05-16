//RF16 - Crear empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf16/https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf16/
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Box, Grid } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useAccionesEmpleado } from '@Hooks/Empleados/useAccionesEmpleado';
import { validarDatosActualizarEmpleado } from '@Modelos/Empleados/ActualizarEmpleado';

const ModalEmpleados = ({ open, onClose, onAccion, empleadoEdicion }) => {
  const esEdicion = !!empleadoEdicion;

  const [alerta, setAlerta] = useState(null);
  const [errores, setErrores] = useState({});
  const [datosEmpleado, setDatosEmpleado] = useState({
    nombre: '',
    nombreCompleto: '',
    correoElectronico: '',
    idEmpleado: '',
    idUsuario: '',
    numeroEmergencia: '',
    areaTrabajo: '',
    posicion: '',
    cantidadPuntos: '',
    antiguedad: null,
  });

  const { handleGuardar, CAMPO_OBLIGATORIO } = useAccionesEmpleado();

  useEffect(() => {
    if (esEdicion && empleadoEdicion) {
      // Validar que la fecha sea válida antes de convertir a dayjs
      let fechaAntiguedad = null;
      if (empleadoEdicion.antiguedad) {
        const fecha = dayjs(empleadoEdicion.antiguedad);
        // Solo asignar si es una fecha válida
        fechaAntiguedad = fecha.isValid() ? fecha : null;
      }

      // Añadir log para ver todos los campos disponibles
      console.log('Campos disponibles en el empleado:', Object.keys(empleadoEdicion));

      const datosConFecha = {
        ...empleadoEdicion,
        idEmpleado: empleadoEdicion.id,
        // Intentar usar el idUsuario si existe o un valor por defecto
        idUsuario: empleadoEdicion.idUsuario || empleadoEdicion.user_id || '',
        // Preservar estos campos
        nombreCompleto: empleadoEdicion.nombreCompleto,
        correoElectronico: empleadoEdicion.correoElectronico,
        antiguedad: fechaAntiguedad,
      };

      console.log('Datos cargados para edición:', datosConFecha);
      setDatosEmpleado(datosConFecha);
    }
  }, [esEdicion, empleadoEdicion]);

  const manejarConfirmacion = async () => {
    const datosProcesados = {
      ...datosEmpleado,
      id: esEdicion ? empleadoEdicion.id : datosEmpleado.idEmpleado,
      nombreCompleto: datosEmpleado.nombreCompleto || datosEmpleado.nombre,
      correoElectronico: datosEmpleado.correoElectronico,
      antiguedad:
        datosEmpleado.antiguedad && datosEmpleado.antiguedad.isValid()
          ? datosEmpleado.antiguedad.format('YYYY-MM-DD')
          : '',
    };

    // 1. Validar usando el modelo
    const erroresValidados = validarDatosActualizarEmpleado(datosProcesados);

    // 2. Si hay errores, actualiza el estado y NO guardes
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados); // Guarda los errores para mostrarlos
      setAlerta({
        tipo: 'error',
        mensaje: 'Corrige los campos marcados antes de continuar.',
      });
      return;
    }

    setErrores({}); // Limpia errores si no hay

    // 3. Si no hay errores, guardar
    const resultado = await handleGuardar(datosProcesados);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        if (onAccion) await onAccion();

        setAlerta({
          tipo: 'success',
          mensaje: resultado.mensaje,
        });

        setTimeout(() => {
          manejarCierre();
        }, 3000);

        if (!esEdicion) {
          setDatosEmpleado({
            idEmpleado: '',
            idUsuario: '',
            numeroEmergencia: '',
            areaTrabajo: '',
            posicion: '',
            cantidadPuntos: '',
            antiguedad: null,
          });
        }
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

    if (name === 'numeroEmergencia') {
      // Reemplazar caracteres no numéricos y limitar a 10 dígitos
      const soloNumeros = value.replace(/\D/g, '').slice(0, 10);
      setDatosEmpleado((prev) => ({ ...prev, [name]: soloNumeros }));
    } else {
      setDatosEmpleado((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarAntiguedad = (nuevaFecha) => {
    // Solo actualizar si es una fecha válida o null
    if (nuevaFecha === null || (nuevaFecha && nuevaFecha.isValid())) {
      setDatosEmpleado((prev) => ({
        ...prev,
        antiguedad: nuevaFecha,
      }));
    }
  };
  const estiloCuadricula = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    console.log('Antiguedad del empleado:', datosEmpleado.antiguedad), //Este es el id del empleado
    (
      <ModalFlotante
        open={open}
        onClose={manejarCierre}
        onConfirm={manejarConfirmacion}
        titulo={esEdicion ? 'Actualizar Empleado' : 'Agregar Empleado'}
      >
        <Box
          component='form'
          method='POST'
          sx={{
            flexGrow: 1,
            '& .MuiTextField-root': { margin: 1, width: '30ch' },
            '& .MuiFormControl-root': { margin: 1, width: '30ch' },
          }}
          noValidate
          autoComplete='off'
        >
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
                error={!!errores.idEmpleado}
                defaultValue={esEdicion ? empleadoEdicion.id : ''}
                helperText={errores.idEmpleado || (!esEdicion ? CAMPO_OBLIGATORIO : '')}
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
                error={!!errores.idUsuario}
                defaultValue={esEdicion ? empleadoEdicion.idUsuario : ''}
                helperText={errores.idUsuario || (!esEdicion ? CAMPO_OBLIGATORIO : '')}
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
                error={!!errores.numeroEmergencia}
                helperText={errores.numeroEmergencia || CAMPO_OBLIGATORIO}
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
                onChange={manejarCambio}
                required
                size='medium'
                error={!!errores.areaTrabajo}
                helperText={errores.areaTrabajo || CAMPO_OBLIGATORIO}
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
                onChange={manejarCambio}
                required
                size='medium'
                error={!!errores.posicion}
                helperText={errores.posicion || CAMPO_OBLIGATORIO}
                inputProps={{
                  maxLength: 50,
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
                error={!!errores.cantidadPuntos}
                helperText={errores.cantidadPuntos || CAMPO_OBLIGATORIO}
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
                  value={
                    datosEmpleado.antiguedad && datosEmpleado.antiguedad.isValid()
                      ? datosEmpleado.antiguedad
                      : null
                  }
                  onChange={manejarAntiguedad}
                  format='DD/MM/YYYY'
                  sx={{ width: '30ch' }}
                  slotProps={{
                    textField: {
                      error:
                        !!errores.antiguedad
                        || (datosEmpleado.antiguedad && !datosEmpleado.antiguedad.isValid()),
                      helperText:
                        errores.antiguedad
                        || (datosEmpleado.antiguedad && !datosEmpleado.antiguedad.isValid()
                          ? 'Fecha inválida'
                          : CAMPO_OBLIGATORIO),
                    },
                  }}
                />
              </LocalizationProvider>
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
    )
  );
};

export default ModalEmpleados;
