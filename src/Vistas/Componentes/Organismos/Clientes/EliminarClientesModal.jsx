import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import Texto from '@Atomos/Texto';

export const EliminarClienteModal = ({
  open,
  cliente,
  onConfirm,
  onCancel,
  eliminacionExitosa,
  errorEliminacion,
  onCloseAlert,
}) => {
  return (
    <>
      <ModalFlotante
        open={open}
        onClose={onCancel}
        onConfirm={onConfirm}
        titulo={`¿Estás seguro de que deseas eliminar a ${cliente?.nombreComercial}?`}
        confirmLabel='Confirmar'
        cancelLabel='Cancelar'
      >
        <Texto>Esta acción no se puede deshacer.</Texto>
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
