//RF16 - Agregar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF16
//RF19 - Actualizar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19
import { Box } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormaEmpleado from '@Organismos/Formularios/FormaEmpleado';
import { useAccionesEmpleado } from '@Hooks/Empleados/useAccionesEmpleado';

const ModalEmpleados = ({ open, onClose, onAccion, empleadoEdicion }) => {
  const {
    datosEmpleado,
    erroresValidacion,
    alerta,
    setAlerta,
    esEdicion,
    manejarCambio,
    manejarAntiguedad,
    obtenerHelperText,
    handleGuardar,
    limpiarFormulario,
  } = useAccionesEmpleado(empleadoEdicion);

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardar();

    if (resultado?.exito) {
      if (onAccion) await onAccion();

      if (!esEdicion) {
        limpiarFormulario();
      }
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
      titulo={esEdicion ? datosEmpleado.nombreCompleto : 'Agregar Empleado'}
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
        <FormaEmpleado
          datosEmpleado={datosEmpleado}
          erroresValidacion={erroresValidacion}
          manejarCambio={manejarCambio}
          manejarAntiguedad={manejarAntiguedad}
          obtenerHelperText={obtenerHelperText}
          esEdicion={esEdicion}
        />
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
