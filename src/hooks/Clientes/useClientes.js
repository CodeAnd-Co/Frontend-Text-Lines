import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente } from '@Hooks/Clientes/useEliminarCliente';
import { useClientePorId } from '@Hooks/Clientes/useLeerCliente';
import { RepositorioActualizarCliente } from '@Repositorios/Clientes/repositorioActualizarCliente';

// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

export const useClientes = () => {
  // Datos de clientes
  const { clientes: clientesOriginales, cargando, error } = useConsultarClientes();
  const [clientes, setClientes] = useState([]);
  const { seleccionarCliente } = useSeleccionarCliente();

  // Estados relacionados con la eliminación
  const [idEliminar, setIdEliminar] = useState(null);
  const [eliminacionExitosa, setEliminacionExitosa] = useState(false);
  const [modoEliminacion, setModoEliminacion] = useState(false);
  const [clienteEliminar, setClienteEliminar] = useState(null);
  const [modalEliminacionAbierto, setModalEliminacionAbierto] = useState(false);

  // Referencias para manejar gestos
  const tiempoPresionado = useRef(null);
  const ignorarPrimerClick = useRef(false);

  // Estados del modal de detalle
  const [idClienteDetalle, setIdClienteDetalle] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);

  // Estados para imagen
  const [imagenSubiendo, setImagenSubiendo] = useState(false);
  const [imagenError, setImagenError] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  // Hook de eliminación y detalles
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

  // Sincronizar clientes
  useEffect(() => {
    if (clientesOriginales) {
      setClientes(clientesOriginales);
    }
  }, [clientesOriginales]);

  // Cuando se abre el modal, cargar el cliente en edición
  useEffect(() => {
    if (cliente) {
      setClienteEditado(cliente);
      setImagenPreview(cliente.urlImagen || null);
      setImagenFile(null);
      setImagenError(null);
    }
  }, [cliente]);

  // Liberar memoria del preview cuando se desmonta
  useEffect(() => {
    return () => {
      if (imagenPreview && imagenPreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagenPreview);
      }
    };
  }, [imagenPreview]);

  // Manejar clic fuera para cerrar modo eliminación
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

  // Manejo de presionado largo
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

  // Clic en cliente
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

  // Modal de eliminación
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

  // Modal de detalle
  const abrirModalDetalle = (clienteId) => {
    setIdClienteDetalle(clienteId);
    setModalDetalleAbierto(true);
  };

  const cerrarModalDetalle = () => {
    setModoEdicion(false);
    setModalDetalleAbierto(false);
    setImagenPreview(null);
    setImagenFile(null);
    setImagenError(null);
  };

  // Cambiar entre modo edición y guardar cambios
  const toggleModoEdicion = async () => {
    if (modoEdicion) {
      try {
        if (!cliente) return;

        // Validaciones
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

        if (imagenFile) {
          const validJpgTypes = ['image/jpeg', 'image/jpg'];
          if (!validJpgTypes.includes(imagenFile.type.toLowerCase())) {
            setImagenError('Solo se permiten imágenes en formato JPG o JPEG.');
            return;
          }

          const MAX_SIZE = 5 * 1024 * 1024;
          if (imagenFile.size > MAX_SIZE) {
            setImagenError('La imagen no debe exceder 5MB de tamaño');
            return;
          }
        }

        const cambios = {};
        let tieneOtrosCambios = false;

        Object.keys(clienteEditado).forEach((key) => {
          if (['urlImagen', 'createdAt', 'updatedAt'].includes(key)) return;
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
          Object.entries(cambios).forEach(([key, value]) => {
            formData.append(key, value);
          });

          if (imagenFile) {
            formData.append('imagen', imagenFile);
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
            })
          );
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

  // Cambios en inputs
  const handleClienteChange = (event) => {
    const { name, value } = event.target;
    const MAX_LENGTH = 100;

    if (value.length > MAX_LENGTH) {
      setImagenError(`El campo ${name} no puede exceder los ${MAX_LENGTH} caracteres`);
      return;
    }

    setClienteEditado((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (imagenError) {
      if (imagenError.includes('caracteres') && value.length <= MAX_LENGTH) {
        setImagenError(null);
      } else if (imagenError.includes('espacios en blanco') && value.trim() !== '') {
        setImagenError(null);
      } else if (imagenError.includes(name)) {
        setImagenError(null);
      }
    }
  };

  // Manejo de imagen subida
  const handleImagenChange = (imageData) => {
    if (imageData.error) {
      setImagenError(imageData.error);
      return;
    }

    if (!imageData.file) {
      setImagenError(null);
      return;
    }

    const validJpgTypes = ['image/jpeg', 'image/jpg'];
    if (!validJpgTypes.includes(imageData.file.type.toLowerCase())) {
      setImagenError('Solo se permiten imágenes en formato JPG o JPEG.');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (imageData.file.size > MAX_SIZE) {
      setImagenError('La imagen no debe exceder 5MB de tamaño');
      return;
    }

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
    imagenSubiendo,
    imagenError,
    imagenPreview,
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
    handleImagenChange,
  };
};
