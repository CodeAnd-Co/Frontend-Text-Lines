//RF16 - Agregar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16
//RF19 - Actualizar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
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
  const [erroresValidacion, setErroresValidacion] = useState({});
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
      let fechaAntiguedad = null;
      if (empleadoEdicion.antiguedad) {
        const fecha = dayjs(empleadoEdicion.antiguedad);
        fechaAntiguedad = fecha.isValid() ? fecha : null;
      }

      const datosConFecha = {
        ...empleadoEdicion,
        idEmpleado: empleadoEdicion.id,
        nombreCompleto: empleadoEdicion.nombreCompleto,
        correoElectronico: empleadoEdicion.correoElectronico,
        antiguedad: fechaAntiguedad,
      };

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

    const nuevosErrores = validarDatosActualizarEmpleado(datosProcesados);
    if (Object.keys(nuevosErrores).length > 0) {
      setErroresValidacion(nuevosErrores);
      setAlerta({
        tipo: 'error',
        mensaje: 'Corrige los errores en el formulario antes de guardar.',
      });
      return;
    }
    setErroresValidacion({});
    setAlerta(null);

    const resultado = await handleGuardar(datosProcesados);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        if (onAccion) await onAccion();

        setAlerta({
          tipo: 'success',
          mensaje: resultado.mensaje,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1200);

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
      const soloNumeros = value.replace(/\D/g, '').slice(0, 10);
      setDatosEmpleado((prev) => ({ ...prev, [name]: soloNumeros }));
    } else {
      setDatosEmpleado((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarAntiguedad = (nuevaFecha) => {
    if (nuevaFecha === null || (nuevaFecha && nuevaFecha.isValid())) {
      setDatosEmpleado((prev) => ({
        ...prev,
        antiguedad: nuevaFecha,
      }));
    }
  };

  const obtenerHelperText = (campo) => {
    const err = erroresValidacion[campo];
    if (err) {
      return typeof err === 'string' ? err : CAMPO_OBLIGATORIO;
    }
    if (
      !esEdicion
      && [
        'idEmpleado',
        'idUsuario',
        'numeroEmergencia',
        'areaTrabajo',
        'posicion',
        'cantidadPuntos',
        'antiguedad',
      ].includes(campo)
    ) {
      return CAMPO_OBLIGATORIO;
    }
    return '';
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
              onChange={manejarCambio}
              required
              size='medium'
              error={!!erroresValidacion.posicion}
              helperText={obtenerHelperText('posicion')}
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
                    error: !!erroresValidacion.antiguedad,
                    helperText: obtenerHelperText('antiguedad'),
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
  );
};

export default ModalEmpleados;
