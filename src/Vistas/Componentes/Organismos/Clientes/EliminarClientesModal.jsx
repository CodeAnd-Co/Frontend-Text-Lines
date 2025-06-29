import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import Texto from '@Atomos/Texto';
import CampoTexto from '@Atomos/CampoTexto';

export const EliminarClienteModal = ({
  open,
  cliente,
  onConfirm,
  onCancel,
  eliminacionExitosa,
  errorEliminacion,
  onCloseAlert,
  textoConfirmacion,
  botonDeshabilitado,
  onCambioTextoConfirmacion,
  errorNombre,
}) => {
  // Obtener el nombre para confirmar
  const nombreConfirmacion = cliente?.nombreComercial || cliente?.nombreVisible || 'este cliente';

  return (
    <>
      <ModalFlotante
        open={open}
        onClose={onCancel}
        onConfirm={onConfirm}
        titulo={`¿Estás seguro de que deseas eliminar a ${nombreConfirmacion}?`}
        confirmLabel='Confirmar'
        cancelLabel='Cancelar'
        botonDeshabilitado={botonDeshabilitado}
      >
        <Texto>Esta acción no se puede deshacer.</Texto>
        <CampoTexto
          id='confirm-deletion'
          label={`Escribe "${nombreConfirmacion}" para confirmar`}
          tipo='text'
          valor={textoConfirmacion}
          onChange={onCambioTextoConfirmacion}
          placeholder={nombreConfirmacion}
          fullWidth
          autoFocus
          error={Boolean(errorNombre)} // solo muestra error si existe
          helperText={errorNombre} // texto del error debajo
          maxLength={100} // límite de caracteres
        />
      </ModalFlotante>

      {errorEliminacion && (
        <Alerta tipo='error' mensaje={errorEliminacion} icono cerrable centradoInferior />
      )}

      {eliminacionExitosa && (
        <Alerta
          tipo='success'
          mensaje='Cliente eliminado exitosamente.'
          icono
          cerrable
          centradoInferior
          duracion={3000}
          onClose={onCloseAlert}
        />
      )}
    </>
  );
};
