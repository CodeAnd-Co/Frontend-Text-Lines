//RF16 - Agregar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16
//RF19 - Actualizar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
import { Box } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormaCrearEmpleado from '@Organismos/Formularios/FormaCrearEmpleado';
import { useCrearEmpleado } from '@SRC/hooks/Empleados/useCrearEmpleado';

const ModalCrearEmpleado = ({ open, onClose, onAccion }) => {
  const {
    datosEmpleado,
    erroresValidacion,
    alerta,
    setAlerta,
    manejarCambio,
    manejarFechaNacimiento,
    manejarAntiguedad,
    obtenerHelperText,
    handleGuardar,
    cargando,
  } = useCrearEmpleado();

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardar();

    if (resultado?.exito) {
      if (onAccion) await onAccion();

      // Esperar un momento para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const manejarCierre = () => {
    setAlerta(null);
    onClose();
  };

  return (
    <ModalFlotante
      open={open}
      onClose={manejarCierre}
      onConfirm={manejarConfirmacion}
      titulo='Añadir Empleados'
      loading={cargando}
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
        <FormaCrearEmpleado
          erroresValidacion={erroresValidacion}
          manejarCambio={manejarCambio}
          manejarFechaNacimiento={manejarFechaNacimiento}
          manejarAntiguedad={manejarAntiguedad}
          obtenerHelperText={obtenerHelperText}
          datosEmpleado={datosEmpleado}
        />
      </Box>

      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='3000'
          onClose={() => setAlerta(null)}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearEmpleado;
