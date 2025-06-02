import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import { tokens } from '@SRC/theme';
import { useState } from 'react';

// Constantes en español
const MENSAJES = {
  CARGANDO: 'Cargando...',
  SOLTAR_ARCHIVO: 'Suelta el archivo aquí...',
  ARRASTRAR_ARCHIVO: 'Arrastra tu imagen o haz clic para seleccionarla',
  ERROR_FORMAT:
    'El formato de archivo no es compatible. Solo se permiten imágenes JPG, JPEG y PNG.',
  ERROR_SIZE: 'El archivo excede el tamaño máximo permitido (5MB)',
};

const ContenedorImportarImagen = ({ onFileAccepted, onError, cargando = false }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [archivoActual, setArchivoActual] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
    maxSize: 5242880, // 5 MB
    disabled: cargando,
    onDrop: (acceptedFiles, rejectedFiles) => {
      // Manejar archivos rechazados (formato o tamaño inválido)
      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        setArchivoActual(null);

        if (rejection.errors.some((evento) => evento.code === 'file-invalid-type')) {
          onError?.(MENSAJES.ERROR_FORMAT);
          return;
        }

        if (rejection.errors.some((evento) => evento.code === 'file-too-large')) {
          onError?.(MENSAJES.ERROR_SIZE);
          return;
        }
      }

      // Procesar archivo aceptado
      if (acceptedFiles && acceptedFiles.length > 0) {
        const archivo = acceptedFiles[0];
        setArchivoActual(archivo);

        // Crear una URL para previsualización
        const preview = URL.createObjectURL(archivo);

        onFileAccepted({
          file: archivo,
          preview,
          name: archivo.name,
          type: archivo.type,
          size: archivo.size,
        });
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: 'relative',
        border: '2px dashed #ccc',
        borderRadius: 2,
        padding: 4,
        textAlign: 'center',
        cursor: cargando ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive && !cargando ? '#f0f0f0' : 'transparent',
        opacity: cargando ? 0.6 : 1,
        pointerEvents: cargando ? 'none' : 'auto',
        mb: 2,
      }}
    >
      {/* input también deshabilitado */}
      <input {...getInputProps()} disabled={cargando} />

      {/* Icono o spinner */}
      {cargando ? (
        <CircularProgress />
      ) : (
        <Icono nombre='UploadFile' size='large' color={colores.altertex[1]} clickable={false} />
      )}

      <Typography variant='body1' sx={{ mt: 1 }}>
        {cargando
          ? MENSAJES.CARGANDO
          : isDragActive
          ? MENSAJES.SOLTAR_ARCHIVO
          : archivoActual
          ? `Archivo cargado: ${archivoActual.name}`
          : MENSAJES.ARRASTRAR_ARCHIVO}
      </Typography>
    </Box>
  );
};

export default ContenedorImportarImagen;
