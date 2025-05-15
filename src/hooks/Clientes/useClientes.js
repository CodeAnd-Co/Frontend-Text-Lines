import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente } from '@Hooks/Clientes/useEliminarCliente';
import { useClientePorId } from '@Hooks/Clientes/useLeerCliente';
import { RepositorioActualizarCliente } from '@Repositorios/Clientes/repositorioActualizarCliente';

// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

export const useClientes = () => {
  // Clientes data
  const { clientes: clientesOriginales, cargando, error } = useConsultarClientes();
  const [clientes, setClientes] = useState([]);
  const { seleccionarCliente } = useSeleccionarCliente();

  // Eliminación state
  const [idEliminar, setIdEliminar] = useState(null);
  const [eliminacionExitosa, setEliminacionExitosa] = useState(false);
  const [clienteEliminar, setClienteEliminar] = useState(null);
  const [modalEliminacionAbierto, setModalEliminacionAbierto] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [confirmDisabled, setConfirmDisabled] = useState(true);

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
    
    // Obtener el nombre del cliente para confirmar
    const nombreConfirmacion = clienteEliminar.nombreComercial || clienteEliminar.nombreVisible || '';
    
    // Verificar si el texto ingresado coincide con el nombre del cliente
    if (confirmText.toLowerCase() === nombreConfirmacion.toLowerCase()) {
      setIdEliminar(clienteEliminar.idCliente);
      setModalEliminacionAbierto(false);
      setClienteEliminar(null);
      setConfirmText('');
      setConfirmDisabled(true);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminacionAbierto(false);
    setClienteEliminar(null);
    // Resetear el texto de confirmación
    setConfirmText('');
    setConfirmDisabled(true);
  };

  // Método para manejar cambios en el texto de confirmación
  const handleConfirmTextChange = (event) => {
    const value = event.target.value;
    setConfirmText(value);
    if (clienteEliminar) {
      // Obtener el nombre del cliente para confirmar
      const nombreConfirmacion = clienteEliminar.nombreComercial || clienteEliminar.nombreVisible || '';
      // Comparar sin distinguir mayúsculas/minúsculas
      setConfirmDisabled(value.toLowerCase() !== nombreConfirmacion.toLowerCase());
    }
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

  // Handler para abrir modal de eliminación desde modal de detalle
  const handleToggleEliminar = () => {
    if (clienteEditado) {
      // Asegurarse de que el objeto cliente tenga la propiedad nombreComercial
      // Si no existe, usar nombreVisible como alternativa
      const clienteParaEliminar = {
        ...clienteEditado,
        nombreComercial: clienteEditado.nombreComercial || clienteEditado.nombreVisible || 'Cliente sin nombre',
      };
      
      setClienteEliminar(clienteParaEliminar);
      setModalEliminacionAbierto(true);
      setModalDetalleAbierto(false); // Cerrar modal de detalle al abrir modal de eliminación
    }
  };

  const toggleModoEdicion = async () => {
    if (modoEdicion) {
      try {
        if (!cliente) return;

        // Validar campos antes de enviar
        const camposObligatorios = ['nombreLegal', 'nombreVisible'];
        const MAX_LENGTH = 100;

        for (const campo of camposObligatorios) {
          if (!clienteEditado[campo]) {
            setImagenError(`El campo ${campo} es obligatorio`);
            return;
          }

          if (clienteEditado[campo].trim() === '') {
            setImagenError(`El campo ${campo} no puede contener solo espacios en blanco`);
            return;
          }

          if (clienteEditado[campo].length > MAX_LENGTH) {
            setImagenError(`El campo ${campo} no puede exceder los ${MAX_LENGTH} caracteres`);
            return;
          }
        }

        // Validar formato y tamaño de imagen antes de enviar
        if (imagenFile) {
          const validJpgTypes = ['image/jpeg', 'image/jpg'];
          if (!validJpgTypes.includes(imagenFile.type.toLowerCase())) {
            setImagenError('Solo se permiten imágenes en formato JPG o JPEG.');
            return;
          }

          const MAX_SIZE = 5 * 1024 * 1024; // 5MB en bytes
          if (imagenFile.size > MAX_SIZE) {
            setImagenError('La imagen no debe exceder 5MB de tamaño');
            return;
          }
        }

        const cambios = {};
        let tieneOtrosCambios = false;

        Object.keys(clienteEditado).forEach((key) => {
          if (key === 'urlImagen' || key === 'createdAt' || key === 'updatedAt') {
            return;
          }
          if (clienteEditado[key] !== cliente[key]) {
            cambios[key] = clienteEditado[key];
            tieneOtrosCambios = true;
          }
        });

        if (clienteEditado.nombreVisible !== cliente.nombreVisible) {
          cambios.nombreComercial = clienteEditado.nombreVisible;
        }

        if (tieneOtrosCambios || imagenFile) {
          setImagenSubiendo(true);
          setImagenError(null);

          const formData = new FormData();
          formData.append('idCliente', clienteEditado.idCliente);

          // Agregar campos modificados al FormData
          Object.entries(cambios).forEach(([key, value]) => {
            formData.append(key, value);
          });

          // Agregar imagen al FormData
          if (imagenFile) {
            formData.append('imagen', imagenFile); // clave debe coincidir con el backend
          }

          await RepositorioActualizarCliente.actualizarClienteConImagen(formData);

          setClientes((prevClientes) =>
            prevClientes.map((cliente) => {
              if (cliente.idCliente === clienteEditado.idCliente) {
                return {
                  ...cliente,
                  ...cambios,
                  ...(imagenFile ? { urlImagen: imagenPreview } : {}),
                };
              }
              return cliente;
            }));
        }

        setModoEdicion(false);
      } catch {
        setImagenError('Error al guardar los cambios. Intente nuevamente.');
      } finally {
        setImagenSubiendo(false);
      }
    } else {
      setModoEdicion(true);
    }
  };

  const handleClienteChange = (event) => {
    const { name, value } = event.target;
    const MAX_LENGTH = 100;

    // Validar longitud máxima de texto sin prohibir texto vacío
    if (value.length > MAX_LENGTH) {
      setImagenError(`El campo ${name} no puede exceder los ${MAX_LENGTH} caracteres`);
      return;
    }

    // Actualizar el valor del campo sin importar si está vacío
    setClienteEditado((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error si existe y se ha corregido
    if (imagenError) {
      // Si el error era sobre caracteres y ahora cumplimos el requisito
      if (imagenError.includes('caracteres') && value.length <= MAX_LENGTH) {
        setImagenError(null);
      } else if (imagenError.includes('espacios en blanco') && value.trim() !== '') {
        setImagenError(null);
      } else if (imagenError.includes(name)) {
        setImagenError(null);
      }
    }
  };

  const handleImagenChange = (imageData) => {
    if (imageData.error) {
      setImagenError(imageData.error);
      return;
    }

    // Si no hay archivo, solo limpiamos error
    if (!imageData.file) {
      setImagenError(null);
      return;
    }

    // Validar que sea un archivo JPG o JPEG
    const validJpgTypes = ['image/jpeg', 'image/jpg'];
    if (!validJpgTypes.includes(imageData.file.type.toLowerCase())) {
      setImagenError('Solo se permiten imágenes en formato JPG o JPEG.');
      return;
    }

    // Validar tamaño de la imagen (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (imageData.file.size > MAX_SIZE) {
      setImagenError('La imagen no debe exceder 5MB de tamaño');
      return;
    }

    // Si llegamos hasta aquí, eliminar cualquier error previo
    setImagenError(null);

    setImagenFile(imageData.file);
    const preview = imageData.preview || URL.createObjectURL(imageData.file);
    setImagenPreview(preview);

    setClienteEditado((prev) => ({
      ...prev,
      urlImagen: preview,
    }));
  };

  const cerrarAlertaExito = () => {
    setEliminacionExitosa(false);
  };

  return {
    // Estado
    clientes,
    cargando,
    error,
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

    // Estados de confirmación
    confirmText,
    confirmDisabled,

    // Handlers
    handleClienteClick,
    handleIconoClick,
    confirmarEliminacion,
    cancelarEliminacion,
    cerrarModalDetalle,
    toggleModoEdicion,
    handleClienteChange,
    cerrarAlertaExito,
    handleToggleEliminar,

    // Handlers de imagen
    handleImagenChange,

    // Handlers de confirmación
    handleConfirmTextChange,
  };
};
