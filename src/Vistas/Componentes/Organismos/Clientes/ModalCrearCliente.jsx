import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import useCrearCliente from '@Hooks/Clientes/useCrearCliente';
import Alerta from '@Moleculas/Alerta';
import { Box, useTheme } from '@mui/material';
import CampoTexto from '@Atomos/CampoTexto';
import Texto from '@Atomos/Texto';
import ContenedorImportarImagen from '@Organismos/ContenedorImportarImagen';

// Constantes en español
const MENSAJES = {
  TITULO: 'Crear cliente',
  CANCELAR: 'Cancelar',
  CREAR: 'Crear',
  CREANDO: 'Creando...',
  NOMBRE_COMERCIAL: 'Nombre comercial',
  NOMBRE_FISCAL: 'Nombre fiscal',
  ERROR_VALIDACION: 'Ingresa el nombre fiscal, nombre comercial y la imagen.',
  RESTRICCION_IMAGEN: 'Solo se permiten imágenes en formato JPG, máximo 5MB.',
  LIMITE_CARACTERES: 'Máximo 100 caracteres',
};

const ModalCrearCliente = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreComercial, setNombreComercial] = useState('');
  const [nombreFiscal, setNombreFiscal] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const theme = useTheme();

  // Track if the form has been reset to prevent multiple resets
  const hasReset = useRef(false);

  const {
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
  } = useCrearCliente();

  // Reset the form only once when the modal closes
  useEffect(() => {
    if (!abierto && !hasReset.current) {
      hasReset.current = true;
      resetEstado();
      // Delay state updates to prevent render loop
      setTimeout(() => {
        setNombreComercial('');
        setNombreFiscal('');
        setImagen(null);
        setMostrarAlerta(false);
      }, 0);
    } else if (abierto) {
      // Reset the flag when modal opens
      hasReset.current = false;
    }
  }, [abierto, resetEstado]);

  // Handle successful creation
  useEffect(() => {
    let timeoutId;
    if (exito) {
      timeoutId = setTimeout(() => {
        if (onCreado) {
          onCreado();
        } else {
          onCerrar();
        }
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [exito, onCreado, onCerrar]);

  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  const handleConfirmar = async () => {
    // Validar que los campos no estén vacíos
    if (!nombreComercial.trim() || !nombreFiscal.trim()) {
      setMostrarAlerta(true);
      return;
    }

    // Enviar datos con nombres limpios (sin espacios innecesarios)
    await crearCliente({
      nombreComercial: nombreComercial.trim(),
      nombreFiscal: nombreFiscal.trim(),
      imagen,
    });
  };

  const handleFileAccepted = (archivo) => {
    // Para mantener consistencia con InfoCliente.jsx
    // Guardamos solo el objeto File, no toda la estructura
    if (archivo && archivo.file) {
      setImagen(archivo.file);
    } else {
      setImagen(archivo);
    }

    // Resetear errores de imagen previos
    if (imagenError) {
      setImagenError(null);
    }
  };

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo={MENSAJES.TITULO}
      cancelLabel={MENSAJES.CANCELAR}
      confirmLabel={cargando ? MENSAJES.CREANDO : MENSAJES.CREAR}
      disabledConfirm={cargando || imagenSubiendo}
    >
      <>
        <CampoTexto
          label={MENSAJES.NOMBRE_COMERCIAL}
          name='nombreComercial'
          value={nombreComercial}
          onChange={(evento) => setNombreComercial(evento.target.value.slice(0, 100))}
          fullWidth={true}
          type='text'
          required={true}
          disabled={cargando || imagenSubiendo}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 100 }}
          helperText={`${nombreComercial.length}/100 - ${MENSAJES.LIMITE_CARACTERES}`}
        />

        <CampoTexto
          label={MENSAJES.NOMBRE_FISCAL}
          name='nombreFiscal'
          value={nombreFiscal}
          onChange={(evento) => setNombreFiscal(evento.target.value.slice(0, 100))}
          fullWidth={true}
          type='text'
          required={true}
          disabled={cargando || imagenSubiendo}
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 100 }}
          helperText={`${nombreFiscal.length}/100 - ${MENSAJES.LIMITE_CARACTERES}`}
        />

        <Box mb={2}>
          <ContenedorImportarImagen
            onFileAccepted={handleFileAccepted}
            cargando={cargando || imagenSubiendo}
          />
        </Box>

        <Texto
          variant='caption'
          display='block'
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          {MENSAJES.RESTRICCION_IMAGEN}
        </Texto>

        {imagenError && (
          <Alerta
            tipo='error'
            mensaje={imagenError}
            cerrable
            duracion={6000}
            onClose={() => setImagenError(null)}
            sx={{ mb: 2, mt: 0 }}
          />
        )}

        {(exito || error) && (
          <Alerta
            tipo={exito ? 'success' : 'error'}
            mensaje={mensaje}
            duracion={exito ? 4000 : 6000}
            sx={{ margin: 3 }}
            cerrable
            onClose={error ? () => setError(false) : undefined}
            centrada
          />
        )}

        {mostrarAlerta && (
          <Alerta
            tipo='warning'
            mensaje={MENSAJES.ERROR_VALIDACION}
            cerrable
            duracion={10000}
            onClose={() => setMostrarAlerta(false)}
            sx={{ mb: 2, mt: 2 }}
          />
        )}
      </>
    </ModalFlotante>
  );
};

export default ModalCrearCliente;
