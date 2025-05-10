import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente } from '@Hooks/Clientes/useEliminarCliente';
import { useClientePorId } from '@Hooks/Clientes/useLeerCliente';
import { RepositorioActualizarCliente } from '@Repositorios/Clientes/repositorioActualizarCliente';

export const useClientes = () => {
  // Clientes data
  const { clientes: clientesOriginales, cargando, error } = useConsultarClientes();
  const [clientes, setClientes] = useState([]);
  const { seleccionarCliente } = useSeleccionarCliente();

  // Eliminación state
  const [idEliminar, setIdEliminar] = useState(null);
  const [eliminacionExitosa, setEliminacionExitosa] = useState(false);
  const [modoEliminacion, setModoEliminacion] = useState(false);
  const [clienteEliminar, setClienteEliminar] = useState(null);
  const [modalEliminacionAbierto, setModalEliminacionAbierto] = useState(false);

  // Referencias para manejo de gestos
  const tiempoPresionado = useRef(null);
  const ignorarPrimerClick = useRef(false);

  // Modal de detalle state
  const [idClienteDetalle, setIdClienteDetalle] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);

  // Estado para manejo de imágenes
  const [imagenSubiendo, setImagenSubiendo] = useState(false);
  const [imagenError, setImagenError] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  // Hooks para eliminar y obtener detalles
  const { error: errorEliminacion } = useEliminarCliente(
    idEliminar,
    setEliminacionExitosa,
    (idClienteEliminado) => {
      setClientes((prev) => prev.filter((cliente) => cliente.idCliente !== idClienteEliminado));
      Cookies.remove('imagenClienteSeleccionado');
      Cookies.remove('nombreClienteSeleccionado');
      seleccionarCliente(null);
      setIdEliminar(null);
    }
  );

  const {
    cliente,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useClientePorId(modalDetalleAbierto ? idClienteDetalle : null);

  // Cargar clientes originales cuando cambien
  useEffect(() => {
    if (clientesOriginales) {
      setClientes(clientesOriginales);
    }
  }, [clientesOriginales]);

  // Actualizar clienteEditado cuando se cargue el detalle del cliente
  useEffect(() => {
    if (cliente) {
      setClienteEditado(cliente);
      setImagenPreview(cliente.urlImagen || null);
      setImagenFile(null);
      setImagenError(null);
    }
  }, [cliente]);

  useEffect(() => {
    return () => {
      if (imagenPreview && imagenPreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagenPreview);
      }
    };
  }, [imagenPreview]);

  // Manejar click fuera para desactivar modo eliminación
  useEffect(() => {
    const manejarClickFuera = () => {
      if (ignorarPrimerClick.current) {
        ignorarPrimerClick.current = false;
        return;
      }
      if (modoEliminacion) {
        setModoEliminacion(false);
      }
    };
    document.addEventListener('click', manejarClickFuera);
    return () => document.removeEventListener('click', manejarClickFuera);
  }, [modoEliminacion]);

  // Handlers para presionado largo
  const handleInicioPresionado = () => {
    tiempoPresionado.current = setTimeout(() => {
      setModoEliminacion(true);
      ignorarPrimerClick.current = true;
    }, 800);
  };

  const handleFinPresionado = () => {
    if (!modoEliminacion) {
      clearTimeout(tiempoPresionado.current);
    }
  };

  // Handlers para clientes
  const handleClienteClick = (clienteId, urlImagen, nombreComercial) => {
    const idCliente = parseInt(clienteId, 10);
    seleccionarCliente(idCliente);
    Cookies.set('imagenClienteSeleccionado', urlImagen, { expires: 1 });
    Cookies.set('nombreClienteSeleccionado', nombreComercial, { expires: 1 });
  };

  const handleIconoClick = (cliente, enModoEliminacion) => {
    if (enModoEliminacion) {
      abrirModalEliminar(cliente);
    } else {
      abrirModalDetalle(cliente.idCliente);
    }
  };

  // Handlers para modal de eliminación
  const abrirModalEliminar = (cliente) => {
    setClienteEliminar(cliente);
    setModalEliminacionAbierto(true);
  };

  const confirmarEliminacion = () => {
    if (!clienteEliminar) return;
    setIdEliminar(clienteEliminar.idCliente);
    setModalEliminacionAbierto(false);
    setClienteEliminar(null);
  };

  const cancelarEliminacion = () => {
    setModalEliminacionAbierto(false);
    setClienteEliminar(null);
  };

  // Handlers para modal de detalle
  const abrirModalDetalle = (clienteId) => {
    setIdClienteDetalle(clienteId);
    setModalDetalleAbierto(true);
  };

  const cerrarModalDetalle = () => {
    setModoEdicion(false);
    setModalDetalleAbierto(false);
    // Limpiar estados de imagen al cerrar
    setImagenPreview(null);
    setImagenFile(null);
    setImagenError(null);
  };

  const toggleModoEdicion = async () => {
    if (modoEdicion) {
      try {
        // Determine what has changed
        const cambios = {};
        let tieneImagenNueva = false;
        let tieneOtrosCambios = false;

        if (cliente) {
          // Check for non-image changes by comparing with original client
          Object.keys(clienteEditado).forEach((key) => {
            if (key !== 'urlImagen' && clienteEditado[key] !== cliente[key]) {
              cambios[key] = clienteEditado[key];
              tieneOtrosCambios = true;
            }
          });

          // Special check for nombreVisible to update nombreComercial
          if (clienteEditado.nombreVisible !== cliente.nombreVisible) {
            cambios.nombreComercial = clienteEditado.nombreVisible;
          }

          // Check if we have a new image file
          tieneImagenNueva = !!imagenFile;
        }

        // If we have a new image, upload it first
        if (tieneImagenNueva) {
          await handleGuardarImagen();
        }

        // If we have other changes, update client data
        if (tieneOtrosCambios) {
          // Create data object with only changed properties
          const datosActualizados = {
            idCliente: clienteEditado.idCliente,
            ...cambios,
          };

          // Call the repository with changed data
          await RepositorioActualizarCliente.actualizarCliente(datosActualizados);
        }

        // Update local state after successful API calls
        if (tieneImagenNueva || tieneOtrosCambios) {
          setClientes((prevClientes) =>
            prevClientes.map((c) => {
              if (c.idCliente === clienteEditado.idCliente) {
                return {
                  ...c,
                  ...clienteEditado,
                  nombreComercial: clienteEditado.nombreVisible,
                };
              }
              return c;
            })
          );
        }

        setModoEdicion(false);
      } catch (error) {
        console.error('Error saving changes:', error);
        setImagenError('Error al guardar los cambios. Intente nuevamente.');
        return;
      }
    } else {
      setModoEdicion(true);
    }
  };

  const handleClienteChange = (event) => {
    const { name, value } = event.target;
    setClienteEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagenChange = (imageData) => {
    if (imageData.error) {
      setImagenError(imageData.error);
      return;
    }

    setImagenError(null);

    if (imageData.file) {
      setImagenFile(imageData.file);

      const preview = imageData.preview || URL.createObjectURL(imageData.file);
      setImagenPreview(preview);

      setClienteEditado((prev) => ({
        ...prev,
        urlImagen: preview,
      }));
    }
  };

  const handleGuardarImagen = async () => {
    if (!imagenFile || !clienteEditado) return;

    try {
      setImagenSubiendo(true);
      setImagenError(null);

      // Create FormData to send the file to backend
      const formData = new FormData();
      formData.append('imagen', imagenFile);
      formData.append('idCliente', clienteEditado.idCliente);

      // Just call the repository with no return value
      await RepositorioActualizarCliente.subirImagenS3(formData);
    } catch (error) {
      console.error('Error al subir imagen a S3:', error);
      setImagenError('Error al subir la imagen. Intente nuevamente.');
      throw error; // Re-throw to handle in toggleModoEdicion
    } finally {
      setImagenSubiendo(false);
    }
  };

  const cerrarAlertaExito = () => {
    setEliminacionExitosa(false);
  };

  return {
    // Estado
    clientes,
    cargando,
    error,
    modoEliminacion,
    clienteEliminar,
    modalEliminacionAbierto,
    idClienteDetalle,
    modalDetalleAbierto,
    clienteEditado,
    modoEdicion,
    cargandoDetalle,
    errorDetalle,
    eliminacionExitosa,
    errorEliminacion,

    // Estados de imagen
    imagenSubiendo,
    imagenError,
    imagenPreview,

    // Handlers
    handleClienteClick,
    handleIconoClick,
    handleInicioPresionado,
    handleFinPresionado,
    confirmarEliminacion,
    cancelarEliminacion,
    cerrarModalDetalle,
    toggleModoEdicion,
    handleClienteChange,
    cerrarAlertaExito,

    // Handlers de imagen
    handleImagenChange,
    handleGuardarImagen,
  };
};
