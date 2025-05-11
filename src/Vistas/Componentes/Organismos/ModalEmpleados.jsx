//RF19 - Actualizar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; // Asegúrate de importar dayjs
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useConsultarRoles } from '@Hooks/Roles/useConsultarRoles';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useAccionesEmpleado } from '@Hooks/Empleados/useAccionesEmpleado';
import { useEliminarEmpleado } from '@Hooks/Empleados/useEliminarEmpleado';

const ModalEmpleados = ({ open, onClose, onAccion, empleadoEdicion }) => {
  const esEdicion = !!empleadoEdicion;

  const [alerta, setAlerta] = useState(null);
  const [datosEmpleado, setDatosEmpleado] = useState({
    nombre: '',
    idEmpleado: '',
    idUsuario: '',
    numeroEmergencia: '',
    areaTrabajo: '',
    posicion: '',
    cantidadPuntos: '',
    antiguedad: null, // Inicializar como null es seguro
  });

  const { errores, handleGuardar, CAMPO_OBLIGATORIO, cargando } = useAccionesEmpleado();
  const { eliminar } = useEliminarEmpleado();
  const { roles, cargando: cargandoRoles } = useConsultarRoles();
  const { clientes } = useConsultarClientes();

  useEffect(() => {
    if (esEdicion && empleadoEdicion) {
      const datosConFecha = {
        ...empleadoEdicion,
        antiguedad: empleadoEdicion.antiguedad ? dayjs(empleadoEdicion.antiguedad) : null,
      };
      setDatosEmpleado(datosConFecha);
    }
  }, [esEdicion, empleadoEdicion]);

  const manejarConfirmacion = async () => {
    // Convertir el objeto dayjs a formato string para enviar al backend

    const datosProcesados = {
      ...datosEmpleado,
      antiguedad: datosEmpleado.antiguedad ? datosEmpleado.antiguedad.format('YYYY-MM-DD') : null,
    };

    const resultado = await handleGuardar(datosProcesados);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        if (onAccion) await onAccion();

        setAlerta({
          tipo: 'success',
          mensaje: resultado.mensaje,
        });

        // Reset solo si es creación
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
    setDatosEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const manejarAntiguedad = (nuevaFecha) => {
    setDatosEmpleado((prev) => ({
      ...prev,
      antiguedad: nuevaFecha, // dayjs se encarga de validar esto
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
                type: 'number',
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
                value={datosEmpleado.antiguedad}
                onChange={manejarAntiguedad}
                format='DD/MM/YYYY'
                sx={{ width: '30ch' }}
                slotProps={{
                  textField: {
                    error: !!errores.antiguedad,
                    helperText:
                      errores.antiguedad === true ? CAMPO_OBLIGATORIO : errores.antiguedad || '',
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
