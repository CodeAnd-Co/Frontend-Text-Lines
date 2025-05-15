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
  confirmText,
  confirmDisabled,
  confirmWord,
  onConfirmTextChange,
}) => {
  return (
    <>
      <ModalFlotante
        open={open}
        onClose={onCancel}
        onConfirm={onConfirm}
        titulo={`¿Estás seguro de que deseas eliminar a ${
          cliente?.nombreComercial || cliente?.nombreVisible || 'este cliente'
        }?`}
        confirmLabel='Confirmar'
        cancelLabel='Cancelar'
        confirmDisabled={confirmDisabled}
      >
        <Texto>Esta acción no se puede deshacer.</Texto>
        <Texto sx={{ mt: 2, mb: 1 }}>Escribe "{confirmWord}" para confirmar:</Texto>
        <CampoTexto
          id="confirm-deletion"
          label={`Escribe "${confirmWord}" para confirmar`}
          tipo="text"
          valor={confirmText}
          onChange={onConfirmTextChange}
          placeholder={`Escribe ${confirmWord} para confirmar`}
          fullWidth
          autoFocus
          error
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
