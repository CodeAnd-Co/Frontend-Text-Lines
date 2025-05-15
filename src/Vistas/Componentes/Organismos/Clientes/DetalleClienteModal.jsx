import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';
import PropTypes from 'prop-types';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';
import { Alert, Box } from '@mui/material'; // Importa Box y Alert de MUI

// Componente que muestra un modal con los detalles de un cliente
export const DetalleClienteModal = ({
  open, // Booleano que indica si el modal está abierto
  cliente, // Objeto con la información del cliente
  modoEdicion, // Booleano que indica si está en modo de edición
  cargando, // Booleano que indica si los datos están cargando
  colores, // Objeto con la paleta de colores
  onClose, // Función para cerrar el modal
  onToggleEdicion, // Función para alternar entre edición y visualización
  onChange, // Función que se llama cuando hay cambios en los datos
  onImageChange, // Función que se llama cuando se cambia la imagen
  imagenSubiendo, // Booleano que indica si una imagen se está subiendo
  imagenError, // Mensaje de error si falla la carga de imagen
}) => {
  const { usuario } = useAuth(); // Obtiene el usuario autenticado

  // Verifica si los campos obligatorios están vacíos cuando se está editando
  const camposInvalidos =
    modoEdicion && cliente ? !cliente.nombreLegal?.trim() || !cliente.nombreVisible?.trim() : false;

  return (
    open && (
      <ModalCliente
        open={open}
        onClose={onClose}
        onConfirm={onClose}
        titulo={cliente?.nombreVisible || 'Cargando...'}
        tituloVariant='h4'
        botones={[
          {
            label: modoEdicion ? 'GUARDAR' : 'EDITAR',
            variant: 'contained',
            color: 'error',
            backgroundColor: colores.altertex[1],
            onClick: onToggleEdicion,
            // Desactiva el botón si:
            // - no hay cliente
            // - el usuario no tiene permiso
            // - hay error de imagen
            // - campos requeridos están vacíos
            disabled:
              !cliente ||
              !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_CLIENTE) ||
              !!imagenError ||
              camposInvalidos,
          },
          {
            label: 'SALIR',
            variant: 'outlined',
            outlineColor: colores.primario[10],
            onClick: onClose,
          },
        ]}
        errorPanel={
          imagenError && (
            <Alert severity='error' sx={{ mt: 3, mb: 2 }}>
              {imagenError}
            </Alert>
          )
        }
      >
        {cargando ? (
          <Texto>Cargando cliente...</Texto>
        ) : cliente ? (
          <InfoCliente
            modoEdicion={modoEdicion}
            idCliente={cliente?.idCliente}
            nombreLegal={cliente?.nombreLegal}
            nombreVisible={cliente?.nombreVisible}
            empleados={cliente?.numeroEmpleados}
            usuariosAsignados={cliente?.usuariosAsignados}
            urlImagen={cliente?.urlImagen}
            onChange={onChange}
            onImageChange={onImageChange}
            imagenSubiendo={imagenSubiendo}
            imagenError={imagenError}
          />
        ) : (
          <Texto>No se encontró información del cliente.</Texto>
        )}
      </ModalCliente>
    )
  );
};

// Validación de props para el componente
DetalleClienteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  cliente: PropTypes.object,
  modoEdicion: PropTypes.bool.isRequired,
  cargando: PropTypes.bool.isRequired,
  colores: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleEdicion: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func,
  imagenSubiendo: PropTypes.bool,
  imagenError: PropTypes.string,
};

export default DetalleClienteModal;
