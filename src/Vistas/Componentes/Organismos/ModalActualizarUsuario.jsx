import { Box } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormularioActualizarUsuario from '@Organismos/Formularios/FormularioActualizarUsuario';
import { useAccionesUsuario } from '@Hooks/Usuarios/useAccionesUsuario';

const ModalActualizarUsuario = ({
  open,
  onClose,
  onAccion,
  usuarioEdicion,
  roles = [],
  clientes = [],
  esSuperAdmin = false,
  cargandoRoles = false,
}) => {
  const {
    datosUsuario,
    erroresValidacion,
    alerta,
    setAlerta,
    manejarCambio,
    manejarFechaNacimiento,
    obtenerHelperText,
    handleGuardar,
    cargando,
    esEdicion,
    limpiarFormulario,
  } = useAccionesUsuario(usuarioEdicion);

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardar();
    if (resultado?.exito) {
      if (onAccion) await onAccion();
      limpiarFormulario();
      setTimeout(() => {
        onClose();
      }, 0);
    }
  };

  const manejarCierre = () => {
    setAlerta(null);
    onClose();
  };

  return (
    <>
      <ModalFlotante
        open={open}
        onClose={manejarCierre}
        onConfirm={manejarConfirmacion}
        titulo={esEdicion ? datosUsuario.nombreCompleto : 'Actualizar Usuario'}
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
          <FormularioActualizarUsuario
            datosUsuario={datosUsuario}
            erroresValidacion={erroresValidacion}
            manejarCambio={manejarCambio}
            manejarFechaNacimiento={manejarFechaNacimiento}
            obtenerHelperText={obtenerHelperText}
            roles={roles}
            clientes={clientes}
            esSuperAdmin={esSuperAdmin}
            cargandoRoles={cargandoRoles}
            cargando={cargando}
          />
        </Box>
      </ModalFlotante>
      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='3000'
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
};

export default ModalActualizarUsuario;
