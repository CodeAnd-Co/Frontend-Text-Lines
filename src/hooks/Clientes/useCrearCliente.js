import { useState, useCallback } from 'react';
import { RepositorioCrearCliente } from '@Repositorios/Clientes/repositorioCrearCliente';
import { CrearCliente } from '@Modelos/Clientes/CrearCliente';

// Constantes en español
const MENSAJES = {
  ERROR_DESCONOCIDO: 'Error desconocido',
  ERROR_GENERICO: 'Ocurrió un error al crear el cliente',
  ERROR_IMAGEN: 'Error al procesar la imagen',
  TAMAÑO_EXCEDIDO: 'La imagen excede el tamaño máximo permitido (5MB)',
};

/**
 * Hook personalizado para crear clientes
 * @returns {Object} Métodos y estado para la creación de clientes
 */
const useCrearCliente = () => {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [imagenSubiendo, setImagenSubiendo] = useState(false);
  const [imagenError, setImagenError] = useState(null);

  /**
   * Valida el tamaño y formato de la imagen
   * @param {File} imagen - Archivo de imagen a validar
   * @returns {boolean} true si la imagen es válida
   */
  const validarImagen = (imagen) => {
    if (!imagen) return true; // Si no hay imagen, es válido (no es obligatoria)

    // Verificar formato
    const formatosValidos = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!formatosValidos.includes(imagen.type)) {
      setImagenError('El formato de imagen debe ser JPG o PNG');
      return false;
    }

    // Verificar tamaño (5MB máximo)
    const tamañoMaximo = 5 * 1024 * 1024; // 5MB en bytes
    if (imagen.size > tamañoMaximo) {
      setImagenError(MENSAJES.TAMAÑO_EXCEDIDO);
      return false;
    }

    return true;
  };

  /**
   * Crea un nuevo cliente con los datos proporcionados
   * @param {Object} clienteData - Datos del cliente
   * @returns {Promise<Object|boolean>} Resultado de la creación o false en caso de error
   */
  const crearCliente = useCallback(async ({ nombreComercial, nombreFiscal, imagen }) => {
    // Reset states
    setCargando(true);
    setExito(false);
    setError(false);
    setMensaje('');
    setImagenError(null);

    // Validar imagen si existe
    if (imagen && !validarImagen(imagen.file)) {
      setCargando(false);
      setError(true);
      return false;
    }

    try {
      // Si hay imagen, indicar que está subiendo
      if (imagen) {
        setImagenSubiendo(true);
      }

      const formData = new FormData();
      formData.append('nombreComercial', nombreComercial.trim());
      formData.append('nombreFiscal', nombreFiscal.trim());

      // Modificación: Verificar si imagen es un objeto completo o directamente un File
      if (imagen) {
        // Si es un objeto con propiedad file (como en el componente InfoCliente)
        if (imagen.file instanceof File) {
          formData.append('imagen', imagen.file);
        }
        // Si es directamente un File
        else if (imagen instanceof File) {
          formData.append('imagen', imagen);
        }
      }

      // Llamar al repositorio para crear el cliente
      const resultado = await RepositorioCrearCliente.crearCliente(formData);

      // Procesar respuesta exitosa
      if (resultado.data && resultado.data.exito) {
        setExito(true);
        setMensaje(resultado.data.exito);
        return resultado;
      } else {
        // Error en la respuesta exitosa
        throw new Error(resultado.data?.error || MENSAJES.ERROR_DESCONOCIDO);
      }
    } catch (err) {
      setExito(false);
      setError(true);

      // Manejar mensaje de error según su origen
      if (err.response.data.mensaje) {
        // Error de API con mensaje específico
        setMensaje(err.response.data.mensaje);
      } else {
        // Mensaje de error genérico
        setMensaje(MENSAJES.ERROR_GENERICO);
      }

      return false;
    } finally {
      setCargando(false);
      setImagenSubiendo(false);
    }
  }, []);

  /**
   * Reinicia el estado del hook
   */
  const resetEstado = useCallback(() => {
    setExito(false);
    setError(false);
    setMensaje('');
    setImagenError(null);
  }, []);

  return {
    crearCliente,
    cargando,
    exito,
    error,
    mensaje,
    setError,
    resetEstado,
    imagenSubiendo,
    imagenError,
    setImagenError,
  };
};

export default useCrearCliente;
