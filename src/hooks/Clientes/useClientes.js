import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useConsultarClientes as useFetchClients } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente as useSelectClient } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente as useDeleteClient } from '@Hooks/Clientes/useEliminarCliente';
import { useClientePorId as useClientById } from '@Hooks/Clientes/useLeerCliente';
import { RepositorioActualizarCliente as ClientUpdateRepository } from '@Repositorios/Clientes/repositorioActualizarCliente';

// RF14 - Update Client - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

export const useClients = () => {
  // Clients data
  const { clientes: originalClients, cargando: loading, error } = useFetchClients();
  const [clients, setClients] = useState([]);
  const { seleccionarCliente: selectClient } = useSelectClient();

  // Deletion state
  const [deleteId, setDeleteId] = useState(null);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [deletionMode, setDeletionMode] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Refs for long press handling
  const pressTimer = useRef(null);
  const ignoreFirstClick = useRef(false);

  // Detail modal state
  const [clientDetailId, setClientDetailId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState(null);

  // Image handling state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Hooks for deletion and detail fetching
  const { error: deletionError } = useDeleteClient(
    deleteId,
    setDeletionSuccess,
    (deletedClientId) => {
      setClients((prev) => prev.filter((c) => c.idCliente !== deletedClientId));
      Cookies.remove('imagenClienteSeleccionado');
      Cookies.remove('nombreClienteSeleccionado');
      selectClient(null);
      setDeleteId(null);
    }
  );

  const {
    cliente: client,
    cargando: loadingDetail,
    error: detailError,
  } = useClientById(isDetailModalOpen ? clientDetailId : null);

  useEffect(() => {
    if (originalClients) {
      setClients(originalClients);
    }
  }, [originalClients]);

  useEffect(() => {
    if (client) {
      setEditedClient(client);
      setImagePreview(client.urlImagen || null);
      setImageFile(null);
      setImageError(null);
    }
  }, [client]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (ignoreFirstClick.current) {
        ignoreFirstClick.current = false;
        return;
      }
      if (deletionMode) {
        setDeletionMode(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [deletionMode]);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setDeletionMode(true);
      ignoreFirstClick.current = true;
    }, 800);
  };

  const handlePressEnd = () => {
    if (!deletionMode) {
      clearTimeout(pressTimer.current);
    }
  };

  const handleClientClick = (clientId, imageUrl, commercialName) => {
    const id = parseInt(clientId, 10);
    selectClient(id);
    Cookies.set('imagenClienteSeleccionado', imageUrl, { expires: 1 });
    Cookies.set('nombreClienteSeleccionado', commercialName, { expires: 1 });
  };

  const handleIconClick = (client, inDeletionMode) => {
    if (inDeletionMode) {
      openDeleteModal(client);
    } else {
      openDetailModal(client.idCliente);
    }
  };

  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!clientToDelete) return;
    setDeleteId(clientToDelete.idCliente);
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const openDetailModal = (clientId) => {
    setClientDetailId(clientId);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsEditMode(false);
    setIsDetailModalOpen(false);
    setImagePreview(null);
    setImageFile(null);
    setImageError(null);
  };

  const toggleEditMode = async () => {
    if (isEditMode) {
      try {
        if (!client) return;

        const requiredFields = ['nombreLegal', 'nombreVisible'];
        const MAX_LENGTH = 100;

        for (const field of requiredFields) {
          const value = editedClient[field];
          if (!value || value.trim() === '') {
            setImageError(`The field ${field} is required and cannot be blank`);
            return;
          }
          if (value.length > MAX_LENGTH) {
            setImageError(`The field ${field} must be less than ${MAX_LENGTH} characters`);
            return;
          }
        }

        if (imageFile) {
          const validTypes = ['image/jpeg', 'image/jpg'];
          if (!validTypes.includes(imageFile.type.toLowerCase())) {
            setImageError('Only JPG or JPEG images are allowed.');
            return;
          }

          const MAX_SIZE = 5 * 1024 * 1024;
          if (imageFile.size > MAX_SIZE) {
            setImageError('Image must be smaller than 5MB.');
            return;
          }
        }

        const changes = {};
        let hasChanges = false;

        Object.keys(editedClient).forEach((key) => {
          if (['urlImagen', 'createdAt', 'updatedAt'].includes(key)) return;
          if (editedClient[key] !== client[key]) {
            changes[key] = editedClient[key];
            hasChanges = true;
          }
        });

        if (editedClient.nombreVisible !== client.nombreVisible) {
          changes.nombreComercial = editedClient.nombreVisible;
        }

        if (hasChanges || imageFile) {
          setUploadingImage(true);
          setImageError(null);

          const formData = new FormData();
          formData.append('idCliente', editedClient.idCliente);

          Object.entries(changes).forEach(([key, value]) => {
            formData.append(key, value);
          });

          if (imageFile) {
            formData.append('imagen', imageFile);
          }

          await ClientUpdateRepository.actualizarClienteConImagen(formData);

          setClients((prev) =>
            prev.map((c) =>
              c.idCliente === editedClient.idCliente
                ? { ...c, ...changes, ...(imageFile ? { urlImagen: imagePreview } : {}) }
                : c
            )
          );
        }

        setIsEditMode(false);
      } catch {
        setImageError('Error saving changes. Please try again.');
      } finally {
        setUploadingImage(false);
      }
    } else {
      setIsEditMode(true);
    }
  };

  const handleClientChange = (event) => {
    const { name, value } = event.target;
    const MAX_LENGTH = 100;

    if (value.length > MAX_LENGTH) {
      setImageError(`The field ${name} must be less than ${MAX_LENGTH} characters`);
      return;
    }

    setEditedClient((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (imageError) {
      if (imageError.includes('characters') && value.length <= MAX_LENGTH) {
        setImageError(null);
      } else if (imageError.includes('blank') && value.trim() !== '') {
        setImageError(null);
      } else if (imageError.includes(name)) {
        setImageError(null);
      }
    }
  };

  const handleImageChange = (imageData) => {
    if (imageData.error) {
      setImageError(imageData.error);
      return;
    }

    if (!imageData.file) {
      setImageError(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg'];
    if (!validTypes.includes(imageData.file.type.toLowerCase())) {
      setImageError('Only JPG or JPEG images are allowed.');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (imageData.file.size > MAX_SIZE) {
      setImageError('Image must be smaller than 5MB.');
      return;
    }

    setImageError(null);

    setImageFile(imageData.file);
    const preview = imageData.preview || URL.createObjectURL(imageData.file);
    setImagePreview(preview);

    setEditedClient((prev) => ({
      ...prev,
      urlImagen: preview,
    }));
  };

  const closeSuccessAlert = () => {
    setDeletionSuccess(false);
  };

  return {
    // State
    clients,
    loading,
    error,
    deletionMode,
    clientToDelete,
    isDeleteModalOpen,
    clientDetailId,
    isDetailModalOpen,
    editedClient,
    isEditMode,
    loadingDetail,
    detailError,
    deletionSuccess,
    deletionError,

    // Image state
    uploadingImage,
    imageError,
    imagePreview,

    // Handlers
    handleClientClick,
    handleIconClick,
    handlePressStart,
    handlePressEnd,
    confirmDelete,
    cancelDelete,
    closeDetailModal,
    toggleEditMode,
    handleClientChange,
    closeSuccessAlert,

    // Image handlers
    handleImageChange,
  };
};
