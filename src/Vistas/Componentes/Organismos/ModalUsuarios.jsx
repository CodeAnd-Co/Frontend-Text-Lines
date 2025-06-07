import { Box } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormularioActualizarUsuario from './Formularios/FormularioActualizarUsuario';
import { useAccionesUsuario } from '@Hooks/Usuarios/useAccionesUsuario';

const ModalUsuarios = ({ open, onClose, onAccion, usuarioEdicion }) => {
  const {
    datosUsuario,
    erroresValidacion,
    alerta,
    setAlerta,
    esEdicion,
    manejarCambio,
    manejarFechaNacimiento,
    obtenerHelperText,
    handleGuardar,
    CAMPO_OBLIGATORIO,
    roles,
    clientes,
    esSuperAdmin,
    cargandoRoles,
  } = useAccionesUsuario(usuarioEdicion);

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardar();
    if (resultado?.exito) {
      if (onAccion) await onAccion();
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
          CAMPO_OBLIGATORIO={CAMPO_OBLIGATORIO}
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

export default ModalUsuarios;
