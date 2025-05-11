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
        // Only proceed if we have the original client data to compare against
        if (!cliente) return;

        // Extract only changed fields
        const cambios = {};

        // Track if we have any non-image changes
        let tieneOtrosCambios = false;

        // Compare each field to find changes (excluding urlImagen which is handled separately)
        Object.keys(clienteEditado).forEach((key) => {
          // Skip urlImagen and internal/technical fields
          if (key === 'urlImagen' || key === 'createdAt' || key === 'updatedAt') {
            return;
          }

          // Only include fields that have actually changed
          if (clienteEditado[key] !== cliente[key]) {
            cambios[key] = clienteEditado[key];
            tieneOtrosCambios = true;
          }
        });

        // Special case for nombreVisible/nombreComercial relationship
        if (clienteEditado.nombreVisible !== cliente.nombreVisible) {
          cambios.nombreComercial = clienteEditado.nombreVisible;
        }

        // Only make API call if we have changes or a new image
        if (tieneOtrosCambios || imagenFile) {
          setImagenSubiendo(true);
          setImagenError(null);

          // Create request data object
          const datosActualizacion = {
            // Add the client ID (required)
            idCliente: clienteEditado.idCliente,

            // Include all changed fields
            ...cambios,
          };

          // If we have an image file, convert it to base64 to include in the request
          if (imagenFile) {
            try {
              const base64Image = await convertFileToBase64(imagenFile);
              // Add image data with metadata
              datosActualizacion.imagenData = {
                contenido: base64Image,
                nombre: imagenFile.name,
                tipo: imagenFile.type,
              };
            } catch (imageError) {
              console.error('Error converting image to base64:', imageError);
              setImagenError('Error al procesar la imagen. Intente nuevamente.');
              setImagenSubiendo(false);
              return;
            }
          }

          // Make a single API call to update both client data and image
          await RepositorioActualizarCliente.actualizarClienteConImagen(datosActualizacion);

          // Update local state after successful API call
          setClientes((prevClientes) =>
            prevClientes.map((c) => {
              if (c.idCliente === clienteEditado.idCliente) {
                return {
                  ...c,
                  ...cambios, // Only apply the actual changes
                  // Include the new image preview if we uploaded one
                  ...(imagenFile ? { urlImagen: imagenPreview } : {}),
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
      } finally {
        setImagenSubiendo(false);
      }
    } else {
      setModoEdicion(true);
    }
  };

  // Helper function to convert File object to base64 string
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data URL prefix
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
  };
};
